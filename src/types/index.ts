export type UserRole = 'visiteur' | 'entreprise' | 'ministere';

export type CompanyStatus = 'brouillon' | 'en_revue' | 'valide' | 'complement_demande' | 'suspendu' | 'expire';

export type OpportunityStatus = 'publiee' | 'fermee' | 'archivee' | 'brouillon';

export type OpportunityType = 'ami' | 'sous_traitance' | 'consultation' | 'formation';

export type ApplicationStatus = 'brouillon' | 'soumise' | 'en_examen' | 'retenue' | 'non_retenue';

export type NotificationType = 'validation' | 'document' | 'opportunite' | 'admin';

export interface Company {
  id: string;
  raisonSociale: string;
  sigle: string;
  formeJuridique: string;
  nif: string;
  rccm: string;
  dateCreation: string;
  region: string;
  ville: string;
  email: string;
  telephone: string;
  siteWeb?: string;
  secteurPrincipal: string;
  typeActeur: string;
  descriptionCourte: string;
  effectifTotal: number;
  effectifNigerien: number;
  tailleEntreprise: string;
  status: CompanyStatus;
  completionRate: number;
  dateInscription: string;
  derniereMiseAJour: string;
  certifications?: string[];
  equipements?: string[];
}

export interface Opportunity {
  id: string;
  titre: string;
  reference: string;
  type: OpportunityType;
  categorie: string;
  region: string;
  description: string;
  structureEmettrice: string;
  datePublication: string;
  dateLimite: string;
  documentsRequis: string[];
  modeReponse: string;
  statut: OpportunityStatus;
}

export interface Application {
  id: string;
  entrepriseId: string;
  entrepriseNom: string;
  opportuniteId: string;
  opportuniteTitre: string;
  statut: ApplicationStatus;
  dateSoumission: string;
  documents: string[];
}

export interface Notification {
  id: string;
  type: NotificationType;
  titre: string;
  message: string;
  date: string;
  lu: boolean;
}

export interface AuditEntry {
  id: string;
  action: string;
  utilisateur: string;
  role: string;
  cible: string;
  date: string;
  details: string;
}

export const REGIONS = ['Niamey', 'Zinder', 'Diffa', 'Agadez', 'Tahoua', 'Maradi', 'Dosso'] as const;

export const CATEGORIES = [
  'Transport et logistique',
  'Génie civil',
  'Maintenance industrielle',
  'Soudure / chaudronnerie',
  'Électricité industrielle',
  'HSE',
  'Environnement',
  'Catering',
  'Sécurité',
  'Location d\'engins',
  'TIC / digital',
  'Formation',
  'Consultance',
  'Fournitures industrielles',
] as const;

export const OPPORTUNITY_TYPES: Record<OpportunityType, string> = {
  ami: 'Appel à manifestation d\'intérêt',
  sous_traitance: 'Opportunité de sous-traitance',
  consultation: 'Consultation',
  formation: 'Formation / renforcement des capacités',
};

export const STATUS_LABELS: Record<CompanyStatus, string> = {
  brouillon: 'Brouillon',
  en_revue: 'En revue',
  valide: 'Validé',
  complement_demande: 'Complément demandé',
  suspendu: 'Suspendu',
  expire: 'Expiré',
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  brouillon: 'Brouillon',
  soumise: 'Soumise',
  en_examen: 'En examen',
  retenue: 'Retenue',
  non_retenue: 'Non retenue',
};
