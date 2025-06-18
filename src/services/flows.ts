import { supabase } from '../supabaseClient';

export async function saveUserFlow({ userId, prompt, flow_json, flow_type, product_name }) {
  const { data, error } = await supabase
    .from('user_flows')
    .insert([
      { user_id: userId, prompt, flow_json, flow_type, product_name },
    ]);
  return { data, error };
}

export async function getUserFlows(userId) {
  const { data, error } = await supabase
    .from('user_flows')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return { data, error };
}

export async function deleteUserFlow(flowId) {
  const { data, error } = await supabase
    .from('user_flows')
    .delete()
    .eq('id', flowId);
  return { data, error };
} 