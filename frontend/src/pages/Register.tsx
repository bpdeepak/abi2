import { useState } from 'react';
import API from '../services/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        email,
        password,
        first_name,
        last_name,
        role: 'analyst',
      });
      alert('Registered successfully!');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <input value={first_name} onChange={(e) => setFirstName(e.target.value)} className="border p-2 w-full" placeholder="First Name" />
      <input value={last_name} onChange={(e) => setLastName(e.target.value)} className="border p-2 w-full" placeholder="Last Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full" placeholder="Password" />
      <button className="bg-green-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
