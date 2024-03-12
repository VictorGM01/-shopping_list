import { createContext } from 'react';

import useAuth from './hooks/Auth';

const Context = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    setAuthenticated,
    userData,
  } = useAuth();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        setAuthenticated,
        userData,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
