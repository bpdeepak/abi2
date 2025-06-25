import { useState } from 'react';
import API from '../services/api';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const setToken = useAuthStore((s) => s.setToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" placeholder="Password" />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
}
