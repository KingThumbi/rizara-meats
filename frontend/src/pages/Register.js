import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { FaExclamationCircle } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    national_id: '',
    user_type: 'farmer',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Full name is required';
    if (!formData.phone.match(/^\+?[0-9]{7,15}$/)) errors.phone = 'Enter a valid phone number';
    if (!formData.national_id) errors.national_id = 'National ID/Passport No is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = 'Invalid email format';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    try {
      const res = await registerUser(formData);
      const { user_type } = res.data;
      setError('');

      // Role-based redirection
      if (user_type === 'farmer') navigate('/dashboard/farmer');
      else if (user_type === 'investor') navigate('/dashboard/investor');
      else if (user_type === 'service') navigate('/dashboard/service');
      else navigate('/dashboard/customer');

    } catch (err) {
      setError('⚠️ Registration failed. Email might already be in use.');
    }
  };

  const renderError = (message) => (
    <p className="flex items-center text-sm text-red-500 gap-1 animate-pulse">
      <FaExclamationCircle className="text-red-500" /> {message}
    </p>
  );

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded shadow animate-fade-in">
      <h2 className="text-xl font-bold text-primary mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4 animate-pulse">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.name && renderError(validationErrors.name)}

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.phone && renderError(validationErrors.phone)}

        <input
          name="national_id"
          placeholder="National ID / Passport No"
          value={formData.national_id}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.national_id && renderError(validationErrors.national_id)}

        <select
          name="user_type"
          value={formData.user_type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="farmer">Farmer</option>
          <option value="investor">Investor</option>
          <option value="service">Service Provider</option>
          <option value="customer">Customer</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.email && renderError(validationErrors.email)}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {validationErrors.password && renderError(validationErrors.password)}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-teal-800 w-full transition duration-200 ease-in-out"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
