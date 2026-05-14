import chemicalData from '../data/chemicals.json';

export interface ChemicalEntry {
    id: string;
    slug: string;
    cas_number: string;
    formula: string;
    category: string; // e.g., 'water-treatment', 'textile', 'general'
    name_tr: string;
    name_en: string;
    name_fr: string;
    name_ar: string;
    description_tr: string;
    description_en: string;
    description_fr: string;
    description_ar: string;
    usage_areas_tr: string[];
    usage_areas_en: string[];
    usage_areas_fr: string[];
    usage_areas_ar: string[];
    // Advanced SEO Fields
    ec_number?: string;
    molecular_weight?: string;
    synonyms_tr?: string;
    synonyms_en?: string;
    synonyms_fr?: string;
    synonyms_ar?: string;
    definition_tr?: string[];
    definition_en?: string[];
    definition_fr?: string[];
    definition_ar?: string[];
    uses_benefits_tr?: string[];
    uses_benefits_en?: string[];
    uses_benefits_fr?: string[];
    uses_benefits_ar?: string[];
    applications_tr?: string[];
    applications_en?: string[];
    applications_fr?: string[];
    applications_ar?: string[];
}

export const CHEMICAL_DICTIONARY: ChemicalEntry[] = chemicalData as ChemicalEntry[];
