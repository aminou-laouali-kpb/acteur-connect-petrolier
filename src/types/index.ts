export type UserRole = 'visiteur' | 'entreprise' | 'ministere' | 'operateur';

// ============= Donneur d'ordre (opérateur pétrolier) =============

export type OperateurType = 'raffinerie' | 'distribution' | 'exploration' | 'transport';

export interface OperateurOrganisation {
  id: string;
  nom: string;
  sigle: string;
  type: OperateurType;
  directeur: string;
  fonction: string;
  email: string;
  site: string;
}

export type TARPhase = 'scoping' | 'contracting' | 'pre_execution' | 'execution' | 'startup' | 'post_tar';

export interface CampagneTAR {
  id: string;
  organisationId: string;
  nom: string;
  reference: string;
  description: string;
  dateArretPrevue: string;     // ISO
  dureeArretJours: number;
  phaseActuelle: TARPhase;
  budgetMillionsFCFA: number;
  objectifContenuLocalPct: number;
  realiseContenuLocalPct: number;
  effectifPicEstime: number;
}

export type LotStatut = 'identifie' | 'scope' | 'ao_lance' | 'attribue' | 'execute' | 'cloture';

export interface LotTAR {
  id: string;
  campagneId: string;
  reference: string;
  intitule: string;
  famille: string;            // famille métier (parmi categories)
  description: string;
  dureeJours: number;
  effectifRequis: number;
  certificationsRequises: string[];
  budgetEstimeMFCFA: number;
  statut: LotStatut;
  attributaireId?: string;    // company id
  prestatairesEligibles?: string[]; // ids présélectionnés
}

export type AOStatut = 'brouillon' | 'publie' | 'cloture' | 'attribue' | 'annule';

export interface AppelOffreOperateur {
  id: string;
  campagneId: string;
  lotId: string;
  reference: string;
  titre: string;
  type: 'rfi' | 'rfq';
  datePublication: string;
  dateLimite: string;
  invites: string[]; // company ids
  statut: AOStatut;
  ponderationTechnique: number;
  ponderationFinanciere: number;
  ponderationContenuLocal: number;
  offres: OffreOperateur[];
}

export interface OffreOperateur {
  id: string;
  entrepriseId: string;
  entrepriseNom: string;
  noteTechnique: number;       // /100
  noteFinanciere: number;      // /100
  noteContenuLocal: number;    // /100
  montantMFCFA: number;
  effectifNigerienPct: number;
  remarques?: string;
}

export interface EngagementContenuLocal {
  campagneId: string;
  poste: 'depenses_locales' | 'main_oeuvre_nigerienne' | 'materiaux_locaux';
  objectifPct: number;
  realisePct: number;
}

export type QualificationStatus =
  | 'pre_enregistre'
  | 'recense'
  | 'dossier_complete'
  | 'en_cours_qualification'
  | 'qualifie'
  | 'qualifie_avec_reserves'
  | 'suspendu'
  | 'a_mettre_a_jour';

// Keep old type as alias for backward compat
export type CompanyStatus = QualificationStatus;

export type OpportunityStatus = 'publiee' | 'fermee' | 'archivee' | 'brouillon';

export type OpportunityType = 'ami' | 'sous_traitance' | 'consultation' | 'formation';

export type ApplicationStatus = 'brouillon' | 'soumise' | 'en_examen' | 'retenue' | 'non_retenue';

export type NotificationType = 'validation' | 'document' | 'opportunite' | 'admin';

export type StructureEmettriceType = 'ministere' | 'compagnie_petroliere' | 'sous_traitant_principal' | 'structure_sectorielle';

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
  status: QualificationStatus;
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
  structureEmettriceType: StructureEmettriceType;
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

export const REGIONS = ['Niamey', 'Zinder', 'Diffa', 'Agadez', 'Tahoua', 'Maradi', 'Dosso', 'Tillabéri'] as const;

export const CATEGORIES = [
  'Transport et logistique',
  'Génie civil',
  'Maintenance industrielle',
  'Soudure / chaudronnerie',
  'Électricité industrielle',
  'HSE',
  'Environnement',
  'Catering / restauration',
  'Sécurité',
  'Location d\'engins',
  'TIC / digital',
  'Formation professionnelle',
  'Consultance',
  'Fournitures industrielles',
  'Services financiers',
  'Banque / assurance / garantie',
  'Hôtellerie / hébergement',
  'RH / recrutement',
  'Transit / douane',
  'Services juridiques',
  'Location de véhicules',
  'Services administratifs',
  'Fournitures de bureau',
] as const;

export const OPPORTUNITY_TYPES: Record<OpportunityType, string> = {
  ami: 'Appel à manifestation d\'intérêt',
  sous_traitance: 'Opportunité de sous-traitance',
  consultation: 'Consultation',
  formation: 'Formation / renforcement des capacités',
};

export const QUALIFICATION_STATUS_LABELS: Record<QualificationStatus, string> = {
  pre_enregistre: 'Pré-enregistré',
  recense: 'Recensé',
  dossier_complete: 'Dossier complété',
  en_cours_qualification: 'En cours de qualification',
  qualifie: 'Qualifié',
  qualifie_avec_reserves: 'Qualifié avec réserves',
  suspendu: 'Suspendu',
  a_mettre_a_jour: 'À mettre à jour',
};

// Keep old export for backward compat
export const STATUS_LABELS = QUALIFICATION_STATUS_LABELS;

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  brouillon: 'Brouillon',
  soumise: 'Soumise',
  en_examen: 'En examen',
  retenue: 'Retenue',
  non_retenue: 'Non retenue',
};

export const STRUCTURE_EMETTRICE_LABELS: Record<StructureEmettriceType, string> = {
  ministere: 'Ministère',
  compagnie_petroliere: 'Compagnie pétrolière',
  sous_traitant_principal: 'Sous-traitant principal',
  structure_sectorielle: 'Structure sectorielle',
};

export const QUALIFICATION_STEPS = [
  { key: 'inscription', label: 'Inscription' },
  { key: 'recensement', label: 'Recensement' },
  { key: 'verification', label: 'Vérification du dossier' },
  { key: 'qualification', label: 'Qualification' },
  { key: 'visibilite', label: 'Visibilité renforcée' },
  { key: 'acces', label: 'Accès aux marchés' },
] as const;

// ============= Admin productivity types =============

export type AgentNotificationCategory =
  | 'nouveau_dossier'
  | 'document_expire'
  | 'mise_a_jour'
  | 'relance_due'
  | 'systeme';

export type AgentNotificationSeverity = 'info' | 'attention' | 'urgent';

export interface AgentNotification {
  id: string;
  category: AgentNotificationCategory;
  severity: AgentNotificationSeverity;
  titre: string;
  message: string;
  entrepriseId?: string;
  entrepriseNom?: string;
  date: string;
  lu: boolean;
  agentAssigne?: string;
}

export type AutomationTrigger =
  | 'documents_complets'
  | 'inactivite_15j'
  | 'certificat_expirant'
  | 'scoring_eleve'
  | 'changement_statut';

export interface AutomationRule {
  id: string;
  nom: string;
  description: string;
  trigger: AutomationTrigger;
  action: string;
  active: boolean;
  derniereExecution?: string;
  occurrences: number;
}

export interface MessageTemplate {
  id: string;
  nom: string;
  objet: string;
  corps: string;
  categorie: string;
}

export interface AutomationLogEntry {
  id: string;
  ruleId: string;
  ruleName: string;
  cible: string;
  date: string;
  resultat: 'succes' | 'echec' | 'info';
  details: string;
}

export interface AgentProfile {
  id: string;
  nom: string;
  fonction: string;
}

export const AGENT_NOTIFICATION_CATEGORY_LABELS: Record<AgentNotificationCategory, string> = {
  nouveau_dossier: 'Nouveau dossier',
  document_expire: 'Document expirant',
  mise_a_jour: 'Mise à jour soumise',
  relance_due: 'Relance due',
  systeme: 'Système',
};

