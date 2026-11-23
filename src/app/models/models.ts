export interface Ingredient {
  nom: string;
  allergene: boolean;
  quantiteRestante: number;
}

export interface Avis {
  nomClient: string;
  note: number;
  commentaire: string;
}

export interface Produit {
  id: string;
  nom: string;
  photo: string;
  prix: number;
  disponible: boolean;
  ingredients: Ingredient[];
  avis: Avis[];
  categorie: string;
  description: string;
  quantiteRestante: number;
}

export interface Administrateur {
  email: string;
  motDePasse: string;
}

export interface LignePanier {
  produit: Produit;
  quantite: number;
}
