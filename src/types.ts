export interface Weight {
  imperial: string;
  metric: string;
}

export type PetType = "cat" | "dog";

export interface CatBreed {
  id: string;
  name: string;
  weight: Weight;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  life_span?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
  reference_image_id?: string;
}

export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}

export interface DogBreed {
  id: number;
  name: string;
  weight: Weight;
  height: Weight;
  country_code?: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
}

export type Breed = CatBreed | DogBreed;
