import { OnboardingFlow, OnboardingStep } from '../types';

interface ExportOptions {
  format: 'markdown' | 'html' | 'json';
  includeAllTabs?: boolean;
}

export const exportFlow = (flow: OnboardingFlow, options: ExportOptions = { format: 'markdown' }): string => {
  const { format, includeAllTabs = true } = options;

  switch (format) {
    case 'markdown':
      return generateMarkdown(flow, includeAllTabs);
    case 'html':
      return generateHTML(flow, includeAllTabs);
    case 'json':
      return JSON.stringify(flow, null, 2);
    default:
      return generateMarkdown(flow, includeAllTabs);
  }
};

const generateMarkdown = (flow: OnboardingFlow, includeAllTabs: boolean): string => {
  const sections: string[] = [];

  // Title
  sections.push(`# ${flow.productInfo.productName} Onboarding Flow\n`);
  sections.push(`Generated on: ${new Date(flow.generatedAt).toLocaleString()}\n`);

  // Product Information
  sections.push('## Product Information\n');
  sections.push(`- **Product Name:** ${flow.productInfo.productName}`);
  sections.push(`- **Target Audience:** ${flow.productInfo.targetAudience}`);
  sections.push(`- **Core User Goal:** ${flow.productInfo.coreUserGoal}`);
  sections.push(`- **Product Type:** ${flow.productInfo.productType}`);
  sections.push(`- **Flow Type:** ${flow.productInfo.flowType}\n`);

  // Key Features
  sections.push('### Key Features\n');
  flow.productInfo.keyFeatures.forEach(feature => {
    sections.push(`- ${feature}`);
  });
  sections.push('');

  // Onboarding Goals
  sections.push('### Onboarding Goals\n');
  sections.push(`- **Education:** ${flow.productInfo.onboardingGoal.education}`);
  sections.push(`- **Feature Setup:** ${flow.productInfo.onboardingGoal.featureSetup}`);
  sections.push(`- **Activation:** ${flow.productInfo.onboardingGoal.activation}\n`);

  // Steps
  sections.push('## Onboarding Steps\n');
  flow.steps.forEach((step, index) => {
    sections.push(`### Step ${index + 1}: ${step.stepName}\n`);
    sections.push(`**Layout:** ${step.layout}\n`);
    sections.push(`**Pattern:** ${step.pattern}\n`);
    
    if (step.headline) {
      sections.push(`**Headline:** ${step.headline}\n`);
    }
    if (step.subtext) {
      sections.push(`**Subtext:** ${step.subtext}\n`);
    }
    if (step.cta) {
      sections.push(`**CTA:** ${step.cta} (${step.ctaType})\n`);
    }

    if (includeAllTabs) {
      sections.push('#### UX Details\n');
      sections.push(`**Goal:** ${step.uxGoal}\n`);
      sections.push(`**User Action:** ${step.userAction}\n`);
      sections.push(`**Rationale:** ${step.rationale}\n`);
      sections.push(`**Pattern Rationale:** ${step.patternRationale}\n`);
    }
    
    sections.push('---\n');
  });

  // Integration Overview
  sections.push('## Integration Overview\n');
  sections.push('### Narrative\n');
  if (Array.isArray(flow.integrationOverview.narrative)) {
    flow.integrationOverview.narrative.forEach(paragraph => {
      sections.push(`${paragraph}\n`);
    });
  } else {
    sections.push(`${flow.integrationOverview.narrative}\n`);
  }

  sections.push('### Implementation Notes\n');
  sections.push(flow.integrationOverview.implementationNotes.split('\n').map(line => `- ${line}`).join('\n'));
  sections.push('');

  // Copy Guidelines
  sections.push('## Copy Guidelines\n');
  sections.push(`**Tone:** ${flow.copy.tone}\n`);
  sections.push(`**Voice:** ${flow.copy.voice}\n`);
  sections.push('**Key Phrases:**\n');
  flow.copy.keyPhrases.forEach(phrase => {
    sections.push(`- ${phrase}`);
  });

  return sections.join('\n');
};

const generateHTML = (flow: OnboardingFlow, includeAllTabs: boolean): string => {
  const markdown = generateMarkdown(flow, includeAllTabs);
  // Convert markdown to HTML (you might want to use a library like marked.js here)
  return `<div class="onboarding-flow-document">${markdown}</div>`;
}; 