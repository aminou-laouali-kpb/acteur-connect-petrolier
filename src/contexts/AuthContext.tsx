import { createContext, useContext, useState, type ReactNode } from 'react';
import type { UserRole, Company, OperateurOrganisation } from '@/types';
import { mockCompanies } from '@/data/mock-data';
import { sorazOrganisation } from '@/data/operateur-mock-data';

interface AuthContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  currentCompany: Company | null;
  currentOrganisation: OperateurOrganisation | null;
  login: (role?: UserRole) => void;
  logout: () => void;
  currentUser: { nom: string; email: string; role: string } | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('visiteur');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const currentCompany = currentRole === 'entreprise' ? mockCompanies[0] : null;
  const currentOrganisation = currentRole === 'operateur' ? sorazOrganisation : null;

  const currentUser = isAuthenticated
    ? currentRole === 'ministere'
      ? { nom: 'Amadou Boubacar', email: 'a.boubacar@petrole.gouv.ne', role: 'Administrateur' }
      : currentRole === 'operateur'
      ? { nom: sorazOrganisation.directeur, email: sorazOrganisation.email, role: sorazOrganisation.fonction }
      : { nom: 'Moussa Diallo', email: 'contact@ssi-niger.ne', role: 'Gérant' }
    : null;

  const login = (role?: UserRole) => {
    setIsAuthenticated(true);
    if (role) setCurrentRole(role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRole('visiteur');
  };

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role !== 'visiteur') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentRole, setCurrentRole: handleSetRole, isAuthenticated, currentCompany, currentOrganisation, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
