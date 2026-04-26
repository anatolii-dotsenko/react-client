import { createContext, useContext, useState } from "react";

interface AuthCtx { 
  isAuth: boolean; 
  login: () => void; 
  logout: () => void; 
}

const AuthContext = createContext<AuthCtx>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuth, setIsAuth] = useState(false);
  
  return (
    <AuthContext.Provider value={{
      isAuth,
      login: () => setIsAuth(true),
      logout: () => setIsAuth(false),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);