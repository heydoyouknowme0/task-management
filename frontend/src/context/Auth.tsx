import axios from "axios";
import { createContext, useEffect, useState, ReactNode } from "react";

// Define the type for the authentication context
interface AuthContextProps {
  auth: boolean | undefined;
  verifyAuth: () => Promise<boolean>;
  isAdmin: boolean | undefined;
}

// Create the authentication context with an initial empty object
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Define the type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component with TypeScript types
export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<boolean | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  // Verify authentication function with TypeScript types
  const verifyAuth = async (): Promise<boolean> => {
    const isLoggedIn = await axios.get(`/api/auth/is_logged_in`);
    setAuth(isLoggedIn.data);
    const isAdminAcc = await axios.get(`/api/auth/is_admin`);
    setIsAdmin(isAdminAcc.data);
    return isLoggedIn.data;
  };

  // Run the verifyAuth function on mount
  useEffect(() => {
    verifyAuth();
  }, []);

  // Provide the authentication context value with TypeScript types
  return (
    <AuthContext.Provider value={{ auth, verifyAuth, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
