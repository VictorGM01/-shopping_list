import { useState, useEffect } from 'react';
import api from '../../api';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const savedUserData = sessionStorage.getItem('userData');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setAuthenticated(true);
    } else if (token) {
      // Decodifica a parte Base64 do token para obter informações do usuário
      const decodedToken = atob(token.split('.')[1]);
      try {
        const parsedUserData = JSON.parse(decodedToken);
        setUserData(parsedUserData);
        sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
        setAuthenticated(true);
      } catch (error) {
        console.error('Erro ao analisar dados do token:', error);
      }
    }

    setLoading(false);
  }, []);

  function setAuthToken(token) {
    sessionStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setAuthenticated(true);

    // Decodifica a parte Base64 do token para obter informações do usuário
    const decodedToken = atob(token.split('.')[1]);
    try {
      const parsedUserData = JSON.parse(decodedToken);
      setUserData(parsedUserData);
      sessionStorage.setItem('userData', JSON.stringify(parsedUserData));
    } catch (error) {
      console.error('Erro ao analisar dados do token:', error);
    }
  }

  async function handleLogin(values) {
    await api
      .post('/usuarios/login', values)
      .then((response) => {
        const { token } = response.data;
        setAuthToken(token);
        window.location.href = '/';
      })
      .catch((error) => {
        alert(error.response.data.erro);
      });
  }

  async function handleLogout() {
    setAuthenticated(false);
    setUserData(null);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('permissions');
    api.defaults.headers.Authorization = undefined;
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  return {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    userData,
    setAuthenticated,
  };
}
