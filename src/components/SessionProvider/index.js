import React, { useContext, createContext } from 'react';

export const SessionContext = createContext({
    user: null,
    initializing: true,
  });
  
  export const SessionProvider = props => {
    return <SessionContext.Provider {...props} />;
  };
  
  export const useSession = () => {
    return useContext(SessionContext);
  };
  