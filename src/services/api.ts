import axios, { AxiosError } from 'axios';
import { OnboardingFlow } from '../types';
import { API_BASE_URL, API_TIMEOUT } from '../utils/constants';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const onboardingService = {
  generateFlow: async (description: string): Promise<OnboardingFlow> => {
    try {
      console.log('Sending request to generate flow:', description);
      const response = await api.post<OnboardingFlow>('/generate-onboarding', {
        description,
      });
      console.log('Received response:', response.data);
      
      // Validate the response data structure
      if (!response.data || !response.data.steps || !Array.isArray(response.data.steps)) {
        console.error('Invalid response structure:', response.data);
        throw new ApiError('Invalid response structure from server');
      }
      
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      if (error instanceof AxiosError) {
        throw new ApiError(
          error.response?.data?.message || 'Failed to generate onboarding flow',
          error.response?.status,
          error.response?.data
        );
      }
      throw new ApiError('An unexpected error occurred');
    }
  },
  generateFlowStream: async (
    description: string,
    onStep: (step: any) => void
  ): Promise<OnboardingFlow> => {
    const response = await fetch(`${API_BASE_URL}/generate-onboarding-stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    if (!response.body) throw new ApiError('No response body for SSE');
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let done = false;
    let finalFlow: OnboardingFlow | null = null;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        buffer += decoder.decode(value, { stream: true });
        let eventMatch;
        // Process all complete events in the buffer
        while ((eventMatch = buffer.match(/event: (\w+)\ndata: ([^\n]+)\n\n/))) {
          const [, event, data] = eventMatch;
          buffer = buffer.slice(eventMatch.index! + eventMatch[0].length);
          if (event === 'progress') {
            try {
              const parsed = JSON.parse(data);
              onStep(parsed);
            } catch (e) {}
          } else if (event === 'step') {
            try {
              const parsed = JSON.parse(data);
              onStep(parsed);
            } catch (e) {}
          } else if (event === 'done') {
            try {
              finalFlow = JSON.parse(data);
            } catch (e) {
              throw new ApiError('Failed to parse final onboarding flow');
            }
          } else if (event === 'error') {
            throw new ApiError(data);
          }
        }
      }
    }
    if (!finalFlow) throw new ApiError('No final onboarding flow received');
    return finalFlow;
  },
}; 