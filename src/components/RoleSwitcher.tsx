import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Building2, Globe, Factory } from 'lucide-react';
import type { UserRole } from '@/types';

const roles: { value: UserRole; label: string; icon: React.ReactNode }[] = [
  { value: 'visiteur', label: 'Visiteur public', icon: <Globe className="h-4 w-4" /> },
  { value: 'entreprise', label: 'Espace entreprise', icon: <Building2 className="h-4 w-4" /> },
  { value: 'operateur', label: 'Donneur d\'ordre (SORAZ)', icon: <Factory className="h-4 w-4" /> },
  { value: 'ministere', label: 'Back-office Ministère', icon: <Shield className="h-4 w-4" /> },
];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useAuth();
  const navigate = useNavigate();

  const handleChange = (value: UserRole) => {
    setCurrentRole(value);
    switch (value) {
      case 'visiteur': navigate('/'); break;
      case 'entreprise': navigate('/entreprise/dashboard'); break;
      case 'operateur': navigate('/operateur/dashboard'); break;
      case 'ministere': navigate('/ministere/dashboard'); break;
    }
  };

  return (
    <Select value={currentRole} onValueChange={handleChange}>
      <SelectTrigger className="w-[240px] text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            <div className="flex items-center gap-2">
              {role.icon}
              <span>{role.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
