import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { getUserFlows, deleteUserFlow } from '../services/flows';
import SavedFlowCard from './SavedFlowCard';
import { OnboardingFlow } from '../types';

interface SavedFlow {
  id: string;
  flow_json: OnboardingFlow;
  prompt: string;
  product_name?: string;
  created_at: string;
}

interface UserFlowsProps {
  onSelectFlow: (flow: SavedFlow) => void;
  onDeleteFlow: (flowId: string) => void;
}

export default function UserFlows({ onSelectFlow = () => {}, onDeleteFlow = () => {} }: UserFlowsProps) {
  const { user } = useSupabaseAuth();
  const [flows, setFlows] = useState<SavedFlow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFlows = async () => {
    if (!user) return;
    setLoading(true);
    setError('');
    const { data, error } = await getUserFlows(user.id);
    if (error) setError(error.message);
    setFlows(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFlows();
    // eslint-disable-next-line
  }, [user]);

  const handleDelete = async (flowId: string) => {
    await deleteUserFlow(flowId);
    fetchFlows();
    onDeleteFlow(flowId);
  };

  if (!user) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="text-muted-foreground text-lg mb-2">Please sign in to view your flows</div>
        <div className="text-muted-foreground text-sm">Your saved flows will appear here</div>
      </div>
    </div>
  );
  
  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="text-muted-foreground text-lg mb-2">Loading your flows...</div>
        <div className="text-muted-foreground text-sm">Please wait</div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="text-red-500 text-lg mb-2">Error loading flows</div>
        <div className="text-muted-foreground text-sm">{error}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {flows.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-muted-foreground text-lg mb-2">No flows found</div>
            <div className="text-muted-foreground text-sm">Create your first flow to get started</div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {flows.map(flow => (
            <SavedFlowCard key={flow.id} flow={flow} onDelete={handleDelete} onSelect={onSelectFlow} />
          ))}
        </div>
      )}
    </div>
  );
} 