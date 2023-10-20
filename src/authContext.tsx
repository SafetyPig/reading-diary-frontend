import { createContext, useContext, FC, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


interface AuthContextType {
  acquireToken: () => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const acquireToken = async () => {
    if (isAuthenticated) {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: 'https://localhost:7299/',
            scope: 'reading-diary.read',
          },
        });

        return token

      } catch (error) {
        console.error('Error acquiring token:', error);
      }
    }

    return ""
  };

  return (
    <AuthContext.Provider value={{ acquireToken }}>
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