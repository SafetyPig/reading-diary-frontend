import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

interface AuthContextType {
  authState: any;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
  }
  

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<any>(null);
    const msalInstance = new PublicClientApplication(msalConfig);

    msalInstance.initialize();

  useEffect(() => {
    const handleRedirect = async () => {
      if (msalInstance.getActiveAccount()) {
        setAuthState({
          isAuthenticated: true,
          user: msalInstance.getActiveAccount(),
        });
      }
    };

    handleRedirect();
  }, []);

  const signIn = async () => {
    try {
      await msalInstance.loginRedirect();
    } catch (error) {
      console.error('Error signing in:', error);
    }
};

  const signOut = () => {
    msalInstance.logout();
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };