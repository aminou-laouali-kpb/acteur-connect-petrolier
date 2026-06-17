import type {
  AgentNotification,
  AutomationRule,
  MessageTemplate,
  AutomationLogEntry,
  AgentProfile,
} from '@/types';
import { mockCompanies } from './mock-data';

export const mockAgents: AgentProfile[] = [
  { id: 'a1', nom: 'Ibrahim Souley', fonction: 'Chef de service Qualification' },
  { id: 'a2', nom: 'Aïssata Maïga', fonction: 'Agente d\'instruction' },
  { id: 'a3', nom: 'Moussa Adamou', fonction: 'Agent d\'instruction' },
  { id: 'a4', nom: 'Fatima Issoufou', fonction: 'Analyste contenu local' },
];

const today = new Date();
const isoDaysAgo = (d: number) => new Date(today.getTime() - d * 86400000).toISOString();

export const mockAgentNotifications: AgentNotification[] = [
  { id: 'n1', category: 'nouveau_dossier', severity: 'info', titre: 'Nouveau dossier soumis', message: 'AÏRWAYS FORMATION SARL a finalisé son recensement.', entrepriseId: '11', entrepriseNom: 'AÏRWAYS FORMATION SARL', date: isoDaysAgo(0), lu: false, agentAssigne: 'Aïssata Maïga' },
  { id: 'n2', category: 'document_expire', severity: 'urgent', titre: 'Attestation fiscale expire dans 12 jours', message: 'SAHEL SERVICES INDUSTRIELS — Attestation de régularité fiscale.', entrepriseId: '1', entrepriseNom: 'SAHEL SERVICES INDUSTRIELS SA', date: isoDaysAgo(0), lu: false, agentAssigne: 'Ibrahim Souley' },
  { id: 'n3', category: 'mise_a_jour', severity: 'attention', titre: 'Documents mis à jour', message: 'AGADEZ MINING SUPPORT SAS a soumis 3 nouveaux documents.', entrepriseId: '3', entrepriseNom: 'AGADEZ MINING SUPPORT SAS', date: isoDaysAgo(1), lu: false, agentAssigne: 'Moussa Adamou' },
  { id: 'n4', category: 'relance_due', severity: 'attention', titre: 'Dossier sans action depuis 18 jours', message: 'TAHOUA GÉNIE CIVIL SA — Relance recommandée.', entrepriseId: '6', entrepriseNom: 'TAHOUA GÉNIE CIVIL SA', date: isoDaysAgo(1), lu: true, agentAssigne: 'Fatima Issoufou' },
  { id: 'n5', category: 'nouveau_dossier', severity: 'info', titre: 'Pré-enregistrement validé', message: 'TAHOUA LOCATION ENGINS SARL — En attente de complétude.', entrepriseId: '19', entrepriseNom: 'TAHOUA LOCATION ENGINS SARL', date: isoDaysAgo(2), lu: true, agentAssigne: 'Aïssata Maïga' },
  { id: 'n6', category: 'document_expire', severity: 'urgent', titre: 'RCCM à renouveler', message: 'ZINDER LOGISTICS EXPRESS — Document échu depuis 4 jours.', entrepriseId: '15', entrepriseNom: 'ZINDER LOGISTICS EXPRESS SARL', date: isoDaysAgo(3), lu: false, agentAssigne: 'Ibrahim Souley' },
  { id: 'n7', category: 'mise_a_jour', severity: 'info', titre: 'Certifications ajoutées', message: 'NIGELEC MAINTENANCE — Nouvelle certification ISO 45001.', entrepriseId: '5', entrepriseNom: 'NIGELEC MAINTENANCE SARL', date: isoDaysAgo(3), lu: true, agentAssigne: 'Moussa Adamou' },
  { id: 'n8', category: 'systeme', severity: 'info', titre: 'Synthèse hebdomadaire générée', message: 'Le rapport hebdomadaire est disponible dans Rapports.', date: isoDaysAgo(4), lu: true },
  { id: 'n9', category: 'relance_due', severity: 'attention', titre: 'Mise à jour requise non traitée', message: 'AGADEZ HSE SOLUTIONS — Demande envoyée il y a 22 jours.', entrepriseId: '17', entrepriseNom: 'AGADEZ HSE SOLUTIONS SARL', date: isoDaysAgo(5), lu: false, agentAssigne: 'Fatima Issoufou' },
  { id: 'n10', category: 'nouveau_dossier', severity: 'info', titre: 'Inscription validée', message: 'MARADI DIGITAL ACADEMY recensée.', entrepriseId: '20', entrepriseNom: 'MARADI DIGITAL ACADEMY SA', date: isoDaysAgo(6), lu: true, agentAssigne: 'Aïssata Maïga' },
  { id: 'n11', category: 'systeme', severity: 'info', titre: 'Sauvegarde automatique', message: 'Sauvegarde du registre effectuée avec succès.', date: isoDaysAgo(7), lu: true },
  { id: 'n12', category: 'document_expire', severity: 'attention', titre: 'Assurance RC professionnelle', message: 'DIFFA PETROLEUM SERVICES — Expire dans 45 jours.', entrepriseId: '4', entrepriseNom: 'DIFFA PETROLEUM SERVICES SA', date: isoDaysAgo(8), lu: true, agentAssigne: 'Ibrahim Souley' },
];

export const mockAutomationRules: AutomationRule[] = [
  { id: 'r1', nom: 'Passage automatique en "Dossier complété"', description: 'Lorsque tous les documents requis sont reçus et validés, le statut passe automatiquement à Dossier complété.', trigger: 'documents_complets', action: 'Changement de statut + notification entreprise', active: true, derniereExecution: isoDaysAgo(0), occurrences: 47 },
  { id: 'r2', nom: 'Relance J+15 sans action', description: 'Envoi automatique d\'une relance au dirigeant si aucune action n\'est enregistrée pendant 15 jours sur un dossier En cours de qualification.', trigger: 'inactivite_15j', action: 'Email + notification interne agent assigné', active: true, derniereExecution: isoDaysAgo(1), occurrences: 18 },
  { id: 'r3', nom: 'Alerte expiration de certificat', description: 'Notification à l\'agent assigné lorsqu\'un certificat fiscal, RCCM ou attestation HSE expire dans moins de 30 jours.', trigger: 'certificat_expirant', action: 'Notification urgente + message à l\'entreprise', active: true, derniereExecution: isoDaysAgo(0), occurrences: 23 },
  { id: 'r4', nom: 'Suggestion IA de statut', description: 'Génération automatique d\'une recommandation de statut basée sur le scoring de complétude, ancienneté et certifications.', trigger: 'scoring_eleve', action: 'Recommandation affichée dans la fiche', active: true, derniereExecution: isoDaysAgo(0), occurrences: 64 },
  { id: 'r5', nom: 'Notification au dirigeant lors du changement de statut', description: 'À chaque changement de statut, un email automatique avec le motif est envoyé au représentant légal de l\'entreprise.', trigger: 'changement_statut', action: 'Email transactionnel + notification entreprise', active: false, derniereExecution: isoDaysAgo(12), occurrences: 9 },
];

export const mockMessageTemplates: MessageTemplate[] = [
  { id: 't1', nom: 'Demande de complément de documents', objet: 'Complément requis — {{entreprise}}', corps: 'Madame, Monsieur,\n\nLe Ministère du Pétrole, dans le cadre de l\'instruction de votre dossier au Registre National du Contenu Local, vous prie de bien vouloir transmettre les pièces complémentaires suivantes...\n\nCordialement,\n{{agent}} — Direction du Contenu Local', categorie: 'Instruction' },
  { id: 't2', nom: 'Notification de qualification', objet: 'Qualification validée — {{entreprise}}', corps: 'Madame, Monsieur,\n\nNous avons le plaisir de vous informer que votre entreprise est désormais inscrite comme entreprise qualifiée du Registre National du Contenu Local Pétrolier, en date du {{date}}.\n\nCordialement,\n{{agent}}', categorie: 'Décision' },
  { id: 't3', nom: 'Notification de suspension', objet: 'Suspension du dossier — {{entreprise}}', corps: 'Madame, Monsieur,\n\nSuite à l\'examen de votre dossier, et conformément aux dispositions en vigueur, votre inscription au Registre est suspendue à compter du {{date}} pour le(s) motif(s) suivant(s)...\n\nCordialement,\n{{agent}}', categorie: 'Décision' },
  { id: 't4', nom: 'Relance mise à jour annuelle', objet: 'Mise à jour annuelle requise — {{entreprise}}', corps: 'Madame, Monsieur,\n\nDans le cadre de la mise à jour annuelle du Registre, nous vous invitons à actualiser les informations et documents de votre dossier avant le {{date}}.\n\nCordialement,\n{{agent}}', categorie: 'Relance' },
];

export const mockAutomationLog: AutomationLogEntry[] = [
  { id: 'l1', ruleId: 'r1', ruleName: 'Passage automatique en "Dossier complété"', cible: 'TÉNÉRÉ DIGITAL SOLUTIONS', date: isoDaysAgo(0), resultat: 'succes', details: 'Statut mis à jour automatiquement.' },
  { id: 'l2', ruleId: 'r3', ruleName: 'Alerte expiration de certificat', cible: 'SAHEL SERVICES INDUSTRIELS', date: isoDaysAgo(0), resultat: 'info', details: 'Attestation fiscale : 12 jours restants.' },
  { id: 'l3', ruleId: 'r2', ruleName: 'Relance J+15 sans action', cible: 'TAHOUA GÉNIE CIVIL', date: isoDaysAgo(1), resultat: 'succes', details: 'Email envoyé au représentant légal.' },
  { id: 'l4', ruleId: 'r4', ruleName: 'Suggestion IA de statut', cible: 'AGADEZ MINING SUPPORT', date: isoDaysAgo(1), resultat: 'info', details: 'Recommandation : Qualifier avec réserves (score 78/100).' },
  { id: 'l5', ruleId: 'r1', ruleName: 'Passage automatique en "Dossier complété"', cible: 'DOSSO MAINTENANCE PLUS', date: isoDaysAgo(2), resultat: 'succes', details: 'Statut mis à jour automatiquement.' },
  { id: 'l6', ruleId: 'r3', ruleName: 'Alerte expiration de certificat', cible: 'DIFFA PETROLEUM SERVICES', date: isoDaysAgo(2), resultat: 'info', details: 'Assurance RC : 45 jours restants.' },
  { id: 'l7', ruleId: 'r2', ruleName: 'Relance J+15 sans action', cible: 'AGADEZ HSE SOLUTIONS', date: isoDaysAgo(3), resultat: 'succes', details: 'Email envoyé. Aucune réponse à ce jour.' },
];

// Assignation des dossiers aux agents (mock)
export const mockCompanyAssignments: Record<string, string> = {
  '1': 'Ibrahim Souley',
  '3': 'Moussa Adamou',
  '6': 'Fatima Issoufou',
  '9': 'Aïssata Maïga',
  '11': 'Aïssata Maïga',
  '14': 'Moussa Adamou',
  '17': 'Fatima Issoufou',
  '18': 'Ibrahim Souley',
  '19': 'Aïssata Maïga',
};

export function computeCompanyScore(companyId: string): {
  score: number;
  recommandation: string;
  justification: string;
} {
  const c = mockCompanies.find(x => x.id === companyId);
  if (!c) return { score: 0, recommandation: '—', justification: '' };
  const ageScore = Math.min(15, Math.max(0, (new Date().getFullYear() - new Date(c.dateCreation).getFullYear())));
  const certScore = (c.certifications?.length ?? 0) * 8;
  const completion = c.completionRate;
  const raw = Math.round(completion * 0.7 + ageScore * 1.5 + certScore);
  const score = Math.max(0, Math.min(100, raw));
  let recommandation = 'Maintenir en instruction';
  let justification = `Score consolidé ${score}/100.`;
  if (score >= 85) { recommandation = 'Qualifier'; justification = `Dossier solide (${completion}% complétion, ${c.certifications?.length ?? 0} certification(s)).`; }
  else if (score >= 70) { recommandation = 'Qualifier avec réserves'; justification = `Dossier recevable avec réserves à lever.`; }
  else if (score >= 50) { recommandation = 'Demander mise à jour'; justification = `Compléments requis avant qualification.`; }
  else { recommandation = 'Maintenir en pré-qualification'; justification = `Dossier insuffisant pour une décision.`; }
  return { score, recommandation, justification };
}
