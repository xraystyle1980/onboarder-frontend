import { useEffect, useState } from 'react';
import { useSupabaseAuth } from '../hooks/useSupabaseAuth';
import { getUserFlows, deleteUserFlow } from '../services/flows';
import FlowCard from './FlowCard';
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

  if (!user) return <div className="text-center py-8">Please sign in to view your flows.</div>;
  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="grid gap-4 grid-cols-1 p-4">
      {flows.length === 0 ? (
        <div className="col-span-full text-center text-slate-500">No flows found.</div>
      ) : (
        flows.map(flow => (
          <FlowCard key={flow.id} flow={flow} onDelete={handleDelete} onSelect={onSelectFlow} />
        ))
      )}
    </div>
  );
} 