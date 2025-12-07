
export interface Pest {
  name: string;
  description: string;
  control: string;
}

export interface Pesticide {
  name: string;
  active_ingredient: string;
  recommendation: string;
}

export interface Product {
  name: string;
  type: string;
  usage: string;
}

export interface CropData {
  pests: Pest[];
  pesticides: Pesticide[];
  products: Product[];
}
