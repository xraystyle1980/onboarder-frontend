import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the magic link!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">Send Magic Link</button>
      <button type="button" onClick={onClose} className="text-slate-500">Cancel</button>
      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
} 