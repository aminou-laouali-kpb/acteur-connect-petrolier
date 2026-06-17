import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { mockAutomationRules, mockAutomationLog, mockMessageTemplates } from '@/data/admin-mock-data';
import type { AutomationRule, MessageTemplate } from '@/types';
import { Zap, History, FileText, CalendarClock, CheckCircle2, AlertCircle, Info, Pencil } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';

export default function Automations() {
  const [rules, setRules] = useState<AutomationRule[]>(mockAutomationRules);
  const [templates, setTemplates] = useState<MessageTemplate[]>(mockMessageTemplates);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, active: !r.active } : r));
    const r = rules.find(x => x.id === id);
    toast.success(`Règle « ${r?.nom} » ${r?.active ? 'désactivée' : 'activée'}`);
  };

  const updateTemplate = (t: MessageTemplate) => {
    setTemplates(templates.map(x => x.id === t.id ? t : x));
    toast.success('Modèle mis à jour');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Zap className="h-6 w-6 text-gold" />Règles & Automatisations</h1>
        <p className="text-sm text-muted-foreground">Réduisez les tâches répétitives en activant les automatisations métier du Registre.</p>
      </div>

      <Tabs defaultValue="rules">
        <TabsList>
          <TabsTrigger value="rules">Règles ({rules.length})</TabsTrigger>
          <TabsTrigger value="templates">Modèles de messages ({templates.length})</TabsTrigger>
          <TabsTrigger value="scheduled">Tâches planifiées</TabsTrigger>
          <TabsTrigger value="log">Journal d'exécution</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-3 mt-6">
          {rules.map(rule => (
            <Card key={rule.id} className={rule.active ? 'border-l-4 border-l-success' : 'opacity-75'}>
              <CardContent className="p-5 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{rule.nom}</h3>
                    {rule.active ? <Badge className="bg-success text-success-foreground text-[10px]">Active</Badge> : <Badge variant="outline" className="text-[10px]">Inactive</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span>Action : <strong className="text-foreground">{rule.action}</strong></span>
                    <span>Exécutions : <strong className="text-foreground">{rule.occurrences}</strong></span>
                    {rule.derniereExecution && <span>Dernière : <strong className="text-foreground">{new Date(rule.derniereExecution).toLocaleDateString('fr-FR')}</strong></span>}
                  </div>
                </div>
                <Switch checked={rule.active} onCheckedChange={() => toggleRule(rule.id)} />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="templates" className="space-y-3 mt-6">
          {templates.map(t => <TemplateCard key={t.id} template={t} onSave={updateTemplate} />)}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-3 mt-6">
          {[
            { titre: 'Rapport hebdomadaire de qualification', cadence: 'Tous les lundis à 08:00', destinataires: 'Direction du Contenu Local', actif: true },
            { titre: 'Synthèse mensuelle au Cabinet du Ministre', cadence: 'Le 1er de chaque mois', destinataires: 'Cabinet ministériel', actif: true },
            { titre: 'Export trimestriel du registre (CSV)', cadence: 'Fin de trimestre', destinataires: 'Service statistiques', actif: true },
            { titre: 'Alerte certificats arrivant à échéance', cadence: 'Quotidienne (06:00)', destinataires: 'Agents assignés', actif: true },
          ].map((t, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center gap-3">
                <CalendarClock className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.titre}</p>
                  <p className="text-xs text-muted-foreground">{t.cadence} · {t.destinataires}</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="log" className="mt-6">
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><History className="h-4 w-4" />Dernières exécutions</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {mockAutomationLog.map(l => (
                <div key={l.id} className="flex items-start gap-3 py-2 border-b last:border-0">
                  {l.resultat === 'succes' && <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />}
                  {l.resultat === 'echec' && <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />}
                  {l.resultat === 'info' && <Info className="h-4 w-4 text-primary mt-0.5" />}
                  <div className="flex-1 text-sm">
                    <p><strong>{l.ruleName}</strong> — {l.cible}</p>
                    <p className="text-xs text-muted-foreground">{l.details}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{new Date(l.date).toLocaleString('fr-FR')}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TemplateCard({ template, onSave }: { template: MessageTemplate; onSave: (t: MessageTemplate) => void }) {
  const [draft, setDraft] = useState(template);
  return (
    <Card>
      <CardContent className="p-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /><h3 className="font-medium text-sm">{template.nom}</h3><Badge variant="outline" className="text-[10px]">{template.categorie}</Badge></div>
          <p className="text-xs text-muted-foreground mt-1">Objet : {template.objet}</p>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{template.corps}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild><Button variant="outline" size="sm"><Pencil className="mr-1 h-3 w-3" />Éditer</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>Modifier le modèle</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input value={draft.nom} onChange={e => setDraft({ ...draft, nom: e.target.value })} placeholder="Nom" />
              <Input value={draft.objet} onChange={e => setDraft({ ...draft, objet: e.target.value })} placeholder="Objet" />
              <Textarea value={draft.corps} onChange={e => setDraft({ ...draft, corps: e.target.value })} rows={10} />
              <p className="text-xs text-muted-foreground">Variables disponibles : {'{{entreprise}}, {{agent}}, {{date}}'}</p>
            </div>
            <DialogFooter>
              <Button onClick={() => onSave(draft)}>Enregistrer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
