import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function ServiceProvidersDashboard() {
  const { token, user_type, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token || user_type !== 'service') {
      navigate('/login');
    } else {
      API.get('/user')
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token, user_type, navigate, logout]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-purple-700">
        Welcome {user?.name || 'Service Provider'} 🛠️
      </h1>
    </div>
  );
}

export default ServiceProvidersDashboard;
