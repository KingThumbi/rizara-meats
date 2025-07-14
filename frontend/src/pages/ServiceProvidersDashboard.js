import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ServiceProvidersDashboard() {
  const { token, user_type } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user_type !== 'service') {
      navigate('/login');
    }
  }, [token, user_type, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-purple-700">Welcome Service Provider 🛠️</h1>
      {/* Service-specific content here */}
    </div>
  );
}

export default ServiceProvidersDashboard;