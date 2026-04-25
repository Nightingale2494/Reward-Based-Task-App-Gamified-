'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '../../lib/api';
import { useAuthStore } from '../../store/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', form);
      setSession(res.data);
      toast.success('Account created');
      router.push('/dashboard');
    } catch {
      toast.error('Registration failed');
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-3">
        <h1 className="text-2xl font-bold">Register</h1>
        <input className="w-full bg-white/10 p-2 rounded-lg" placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <input className="w-full bg-white/10 p-2 rounded-lg" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" className="w-full bg-white/10 p-2 rounded-lg" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="w-full p-2 rounded-lg bg-violet">Create Account</button>
      </form>
    </main>
  );
}
