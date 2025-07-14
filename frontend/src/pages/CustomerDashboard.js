import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
  const { token, user_type } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user_type !== 'customer') {
      navigate('/login');
    }
  }, [token, user_type, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-yellow-700">Welcome Customer 🛒</h1>
      {/* Customer-specific content here */}
    </div>
  );
}

export default CustomerDashboard;