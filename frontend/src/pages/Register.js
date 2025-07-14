import React, { useState } from 'react';
import { registerUser } from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password });
      setSuccess("🎉 Registration successful! You can now log in.");
      setEmail('');
      setPassword('');
      setError('');
    } catch (err) {
      setError("⚠️ Registration failed. Email might already be in use.");
      setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold text-primary mb-4">Register</h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-800">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
