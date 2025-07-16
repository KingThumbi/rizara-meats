import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post('/login', { email, password });
    const { token, user_type } = res.data;
    login(token, user_type);
  } catch (err) {
    alert('Login failed. Check credentials.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9f5ec]">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold text-[#006400] mb-4">Rizara Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
          className="block w-full mb-3 p-2 border rounded" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
          className="block w-full mb-3 p-2 border rounded" required />
        <button type="submit" className="bg-[#006400] text-white py-2 px-4 rounded w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
