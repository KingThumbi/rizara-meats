import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function InvestorDashboard() {
  const { token, user_type, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token || user_type !== 'investor') {
      navigate('/login');
    } else {
      API.get('/user')
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token, user_type, navigate, logout]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-blue-700">
        Welcome {user?.name || 'Investor'} 💼
      </h1>
    </div>
  );
}

export default InvestorDashboard;