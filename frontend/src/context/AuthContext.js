import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    user_type: localStorage.getItem('user_type')
  });

  // Auto-redirect to dashboard if logged in
  useEffect(() => {
    if (auth.token && auth.user_type) {
      navigate(`/dashboard/${auth.user_type}`);
    }
  }, [auth.token, auth.user_type, navigate]);

  const login = (token, user_type) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user_type', user_type);
    setAuth({ token, user_type });
    navigate(`/dashboard/${user_type}`);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setAuth({ token: null, user_type: null });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
