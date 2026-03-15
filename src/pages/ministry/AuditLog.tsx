import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockAuditLog } from '@/data/mock-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const filtered = mockAuditLog.filter(e =>
    !search || e.action.toLowerCase().includes(search.toLowerCase()) || e.cible.toLowerCase().includes(search.toLowerCase()) || e.utilisateur.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Journal d'audit</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Rechercher dans le journal..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Cible</TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{entry.date}</TableCell>
                  <TableCell className="font-medium text-sm">{entry.action}</TableCell>
                  <TableCell className="text-sm">{entry.utilisateur}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{entry.role}</TableCell>
                  <TableCell className="text-sm">{entry.cible}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{entry.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
