import { createContext, useContext, useEffect, useState, FC, ReactNode } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import { MsalProvider } from "@azure/msal-react";

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

  const acquireToken = async () => {
    try {      
      await msalInstance.initialize();
      await msalInstance.handleRedirectPromise();
      const response = await msalInstance.acquireTokenSilent({
        scopes: ['https://piggycorp.onmicrosoft.com/reading-diary-api/reading-diary.read']
      });
      
      return response.accessToken;      
    } catch (error) {
      console.error('Error acquiring token:', error);
      throw error;
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      await msalInstance.handleRedirectPromise();

      if (msalInstance.getActiveAccount()) {        
        setAuthState({
          isAuthenticated: true,
          user: msalInstance.getActiveAccount(),
          token: await acquireToken()
        });
      }
    };  

    handleRedirect();
  }, []);

  const signIn = async () => {
    try {
      const user = msalInstance.getActiveAccount();      
      if (user === null) {
        await msalInstance.loginRedirect();
      }
      
      acquireToken()
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    await msalInstance.handleRedirectPromise();
    msalInstance.logoutRedirect();
  };

  return (
    <AuthContext.Provider value={{ authState, signIn, signOut }}>
      <MsalProvider instance={msalInstance}>
        {children}
      </MsalProvider>
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