import type { OperateurOrganisation, CampagneTAR, LotTAR, AppelOffreOperateur, EngagementContenuLocal } from '@/types';
import { mockCompanies } from '@/data/mock-data';

export const sorazOrganisation: OperateurOrganisation = {
  id: 'op-soraz',
  nom: 'Société de Raffinage de Zinder',
  sigle: 'SORAZ',
  type: 'raffinerie',
  directeur: 'Ibrahim Mahamadou',
  fonction: 'Directeur Maintenance & Inspection',
  email: 'maintenance@soraz.ne',
  site: 'Raffinerie de Zinder · 20 000 b/j',
};

export const operateurOrganisations: OperateurOrganisation[] = [
  sorazOrganisation,
  { id: 'op-sonidep', nom: 'Société Nigérienne de Pétrole', sigle: 'SONIDEP', type: 'distribution', directeur: 'Aïssata Issoufou', fonction: 'Directrice Logistique', email: 'log@sonidep.ne', site: 'Niamey' },
  { id: 'op-wapco', nom: 'WAPCo Niger', sigle: 'WAPCo', type: 'transport', directeur: 'Boubacar Sani', fonction: 'Directeur Opérations Pipeline', email: 'ops@wapco.ne', site: 'Pipeline Niger-Bénin' },
];

// Campagne SORAZ TAR 2026 (arrêt prévu dans ~14 mois)
const dateArret = new Date();
dateArret.setMonth(dateArret.getMonth() + 14);

export const sorazCampagne: CampagneTAR = {
  id: 'tar-soraz-2026',
  organisationId: 'op-soraz',
  nom: 'Grande Maintenance SORAZ 2026',
  reference: 'GM-SORAZ-2026',
  description: 'Quatrième grande maintenance triennale de la raffinerie de Zinder. Arrêt complet de l\'unité de distillation, reformage catalytique et unité GPL. Inspection réglementaire des équipements sous pression.',
  dateArretPrevue: dateArret.toISOString().slice(0, 10),
  dureeArretJours: 60,
  phaseActuelle: 'scoping',
  budgetMillionsFCFA: 18500,
  objectifContenuLocalPct: 60,
  realiseContenuLocalPct: 42,
  effectifPicEstime: 2200,
};

export const mockCampagnes: CampagneTAR[] = [
  sorazCampagne,
  {
    id: 'arret-mineur-soraz-2025',
    organisationId: 'op-soraz',
    nom: 'Arrêt mineur unité GPL — Q3 2025',
    reference: 'AM-GPL-2025',
    description: 'Arrêt partiel de 12 jours pour remplacement de catalyseur et inspection des récipients sous pression GPL.',
    dateArretPrevue: '2025-09-15',
    dureeArretJours: 12,
    phaseActuelle: 'post_tar',
    budgetMillionsFCFA: 1200,
    objectifContenuLocalPct: 55,
    realiseContenuLocalPct: 58,
    effectifPicEstime: 280,
  },
];

const cert = (c: string[]) => c;

export const mockLots: LotTAR[] = [
  { id: 'lot-001', campagneId: 'tar-soraz-2026', reference: 'L-ECH-01', intitule: 'Échafaudage périmètre unités process', famille: 'Maintenance industrielle', description: 'Montage et démontage d\'échafaudages tubulaires accès colonnes C-101/C-201 et fours F-101.', dureeJours: 55, effectifRequis: 80, certificationsRequises: cert(['CISRS / équivalent', 'ISO 45001']), budgetEstimeMFCFA: 480, statut: 'scope', prestatairesEligibles: ['1', '6'] },
  { id: 'lot-002', campagneId: 'tar-soraz-2026', reference: 'L-SOUD-01', intitule: 'Soudure chaudronnerie tuyauteries process', famille: 'Soudure / chaudronnerie', description: 'Remplacement tronçons tuyauteries P&ID 12-PR-104, qualification ASME IX requise.', dureeJours: 45, effectifRequis: 35, certificationsRequises: cert(['ASME Section IX', 'EN ISO 9606', 'ISO 9001']), budgetEstimeMFCFA: 920, statut: 'ao_lance', prestatairesEligibles: ['1', '5'] },
  { id: 'lot-003', campagneId: 'tar-soraz-2026', reference: 'L-NDT-01', intitule: 'Contrôles Non Destructifs (RT/UT/PT/MT)', famille: 'Maintenance industrielle', description: 'Inspection réglementaire récipients sous pression, échangeurs, tuyauteries. Méthodes RT, UT, PT, MT.', dureeJours: 40, effectifRequis: 18, certificationsRequises: cert(['ASNT Level II', 'COFREND', 'ISO 9712']), budgetEstimeMFCFA: 560, statut: 'identifie', prestatairesEligibles: ['1'] },
  { id: 'lot-004', campagneId: 'tar-soraz-2026', reference: 'L-CAL-01', intitule: 'Calorifugeage et protection thermique', famille: 'Maintenance industrielle', description: 'Dépose, contrôle et repose du calorifugeage sur fours, colonnes et tuyauteries chaudes.', dureeJours: 50, effectifRequis: 45, certificationsRequises: cert(['ISO 45001']), budgetEstimeMFCFA: 320, statut: 'identifie', prestatairesEligibles: ['1', '6'] },
  { id: 'lot-005', campagneId: 'tar-soraz-2026', reference: 'L-HYDRO-01', intitule: 'Nettoyage industriel & hydroblasting HHP', famille: 'Maintenance industrielle', description: 'Nettoyage haute pression (>700 bar) échangeurs, faisceaux tubulaires, dépôt coke fours.', dureeJours: 35, effectifRequis: 22, certificationsRequises: cert(['WJTA', 'ISO 45001']), budgetEstimeMFCFA: 410, statut: 'identifie', prestatairesEligibles: [] },
  { id: 'lot-006', campagneId: 'tar-soraz-2026', reference: 'L-CAT-01', intitule: 'Déchargement / rechargement catalyseur reformage', famille: 'Maintenance industrielle', description: 'Opération catalyseur unité reformage catalytique avec procédure constructeur. Spécialiste requis.', dureeJours: 18, effectifRequis: 14, certificationsRequises: cert(['Procédure constructeur', 'ISO 45001']), budgetEstimeMFCFA: 380, statut: 'identifie', prestatairesEligibles: [] },
  { id: 'lot-007', campagneId: 'tar-soraz-2026', reference: 'L-ELEC-01', intitule: 'Électricité & instrumentation ATEX', famille: 'Électricité industrielle', description: 'Maintenance moteurs HT/BT, capteurs, vannes de contrôle et révision automates en zone ATEX.', dureeJours: 42, effectifRequis: 28, certificationsRequises: cert(['IEC 60079', 'ATEX', 'ISO 9001']), budgetEstimeMFCFA: 720, statut: 'ao_lance', prestatairesEligibles: ['5'] },
  { id: 'lot-008', campagneId: 'tar-soraz-2026', reference: 'L-LEV-01', intitule: 'Levage et grutage charges lourdes', famille: 'Location d\'engins', description: 'Grues automotrices 80T-200T pour manutention faisceaux d\'échangeurs et pièces lourdes.', dureeJours: 30, effectifRequis: 12, certificationsRequises: cert(['LEEA', 'Opérateurs certifiés']), budgetEstimeMFCFA: 290, statut: 'scope', prestatairesEligibles: ['3'] },
  { id: 'lot-009', campagneId: 'tar-soraz-2026', reference: 'L-HSE-01', intitule: 'Surveillance HSE & pompiers de chantier', famille: 'HSE', description: 'Équipes HSE H24, surveillance permis de feu, intervention d\'urgence sur site pendant TAR.', dureeJours: 60, effectifRequis: 40, certificationsRequises: cert(['NEBOSH IGC', 'Formation feu industriel']), budgetEstimeMFCFA: 510, statut: 'attribue', attributaireId: '4', prestatairesEligibles: ['4'] },
  { id: 'lot-010', campagneId: 'tar-soraz-2026', reference: 'L-CAT-RESTO', intitule: 'Restauration collective base-vie (2200 pax/j)', famille: 'Catering / restauration', description: 'Restauration 3 services/jour pour effectif de pointe 2200 personnes pendant 60 jours.', dureeJours: 70, effectifRequis: 55, certificationsRequises: cert(['HACCP', 'Agrément sanitaire']), budgetEstimeMFCFA: 380, statut: 'attribue', attributaireId: '7', prestatairesEligibles: ['7'] },
  { id: 'lot-011', campagneId: 'tar-soraz-2026', reference: 'L-SEC-01', intitule: 'Gardiennage & contrôle d\'accès renforcé', famille: 'Sécurité', description: 'Renfort gardiennage 24h/24 pendant phase d\'exécution. Contrôle accès 2200 prestataires.', dureeJours: 75, effectifRequis: 60, certificationsRequises: cert(['Agrément Ministère Intérieur']), budgetEstimeMFCFA: 240, statut: 'attribue', attributaireId: '8', prestatairesEligibles: ['8'] },
  { id: 'lot-012', campagneId: 'tar-soraz-2026', reference: 'L-LOG-01', intitule: 'Transport personnel & logistique pièces', famille: 'Transport et logistique', description: 'Navettes quotidiennes base-vie / site, transport pièces lourdes depuis port Cotonou / Lomé.', dureeJours: 65, effectifRequis: 38, certificationsRequises: cert(['Agrément transport', 'ISO 9001']), budgetEstimeMFCFA: 420, statut: 'scope', prestatairesEligibles: ['2'] },
];

export const mockAppelsOffresOperateur: AppelOffreOperateur[] = [
  {
    id: 'ao-001',
    campagneId: 'tar-soraz-2026',
    lotId: 'lot-002',
    reference: 'AO-SORAZ-L-SOUD-01',
    titre: 'Soudure chaudronnerie tuyauteries process — GM 2026',
    type: 'rfq',
    datePublication: '2026-04-15',
    dateLimite: '2026-05-30',
    invites: ['1', '5'],
    statut: 'publie',
    ponderationTechnique: 50,
    ponderationFinanciere: 30,
    ponderationContenuLocal: 20,
    offres: [
      { id: 'off-1', entrepriseId: '1', entrepriseNom: 'SAHEL SERVICES INDUSTRIELS', noteTechnique: 88, noteFinanciere: 75, noteContenuLocal: 92, montantMFCFA: 890, effectifNigerienPct: 92 },
      { id: 'off-2', entrepriseId: '5', entrepriseNom: 'NIGELEC MAINTENANCE', noteTechnique: 78, noteFinanciere: 82, noteContenuLocal: 88, montantMFCFA: 840, effectifNigerienPct: 95 },
    ],
  },
  {
    id: 'ao-002',
    campagneId: 'tar-soraz-2026',
    lotId: 'lot-007',
    reference: 'AO-SORAZ-L-ELEC-01',
    titre: 'Électricité & instrumentation ATEX — GM 2026',
    type: 'rfq',
    datePublication: '2026-04-20',
    dateLimite: '2026-06-05',
    invites: ['5'],
    statut: 'publie',
    ponderationTechnique: 55,
    ponderationFinanciere: 25,
    ponderationContenuLocal: 20,
    offres: [
      { id: 'off-3', entrepriseId: '5', entrepriseNom: 'NIGELEC MAINTENANCE', noteTechnique: 82, noteFinanciere: 78, noteContenuLocal: 90, montantMFCFA: 705, effectifNigerienPct: 95 },
    ],
  },
  {
    id: 'ao-003',
    campagneId: 'tar-soraz-2026',
    lotId: 'lot-001',
    reference: 'RFI-SORAZ-ECH-01',
    titre: 'RFI Échafaudage périmètre unités process',
    type: 'rfi',
    datePublication: '2026-03-10',
    dateLimite: '2026-04-10',
    invites: ['1', '6'],
    statut: 'cloture',
    ponderationTechnique: 60,
    ponderationFinanciere: 20,
    ponderationContenuLocal: 20,
    offres: [],
  },
];

export const mockEngagementsCL: EngagementContenuLocal[] = [
  { campagneId: 'tar-soraz-2026', poste: 'depenses_locales', objectifPct: 60, realisePct: 42 },
  { campagneId: 'tar-soraz-2026', poste: 'main_oeuvre_nigerienne', objectifPct: 75, realisePct: 68 },
  { campagneId: 'tar-soraz-2026', poste: 'materiaux_locaux', objectifPct: 35, realisePct: 22 },
];

// Helpers
export function getLotsForCampagne(campagneId: string) {
  return mockLots.filter(l => l.campagneId === campagneId);
}
export function getEligibleCompaniesForLot(lot: LotTAR) {
  return mockCompanies.filter(c =>
    c.secteurPrincipal === lot.famille &&
    (c.status === 'qualifie' || c.status === 'qualifie_avec_reserves')
  );
}
export function getAOsForCampagne(campagneId: string) {
  return mockAppelsOffresOperateur.filter(a => a.campagneId === campagneId);
}

export const TAR_PHASE_LABELS = {
  scoping: 'Scoping & cadrage',
  contracting: 'Contractualisation',
  pre_execution: 'Préparation exécution',
  execution: 'Exécution arrêt',
  startup: 'Redémarrage',
  post_tar: 'Post-TAR / clôture',
} as const;

export const LOT_STATUT_LABELS = {
  identifie: 'Identifié',
  scope: 'Scopé',
  ao_lance: 'AO lancé',
  attribue: 'Attribué',
  execute: 'Exécuté',
  cloture: 'Clôturé',
} as const;

export const AO_STATUT_LABELS = {
  brouillon: 'Brouillon',
  publie: 'Publié',
  cloture: 'Clôturé',
  attribue: 'Attribué',
  annule: 'Annulé',
} as const;
