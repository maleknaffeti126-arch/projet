import { Injectable, signal, computed } from '@angular/core';
import { Ingredient, LignePanier, Produit } from '../models/models';

const produitsDepart: Produit[] = [
  { id: 'c1', nom: 'Cookie chocolat', photo: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900', prix: 4.5, disponible: true, categorie: 'Cookies', description: 'Un cookie moelleux au cœur fondant, généreusement garni de pépites de chocolat.', quantiteRestante: 10, ingredients: [{nom:'Farine',allergene:true,quantiteRestante:500},{nom:'Beurre',allergene:true,quantiteRestante:300},{nom:'Chocolat',allergene:true,quantiteRestante:400}], avis: [{nomClient:'Sarra',note:5,commentaire:'Délicieux et très moelleux !'}] },
  { id: 'c2', nom: 'Cookie noisette', photo: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=900', prix: 5, disponible: true, categorie: 'Cookies', description: 'Cookie gourmand aux éclats de noisettes et chocolat au lait.', quantiteRestante: 8, ingredients: [{nom:'Farine',allergene:true,quantiteRestante:500},{nom:'Noisettes',allergene:true,quantiteRestante:200}], avis: [] },
  { id: 'b1', nom: 'Brownie classique', photo: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=900', prix: 6, disponible: true, categorie: 'Brownies', description: 'Brownie intense en chocolat, fondant à l’intérieur et légèrement croustillant.', quantiteRestante: 10, ingredients: [{nom:'Chocolat',allergene:true,quantiteRestante:400},{nom:'Œufs',allergene:true,quantiteRestante:12},{nom:'Farine',allergene:true,quantiteRestante:500}], avis: [{nomClient:'Amira',note:5,commentaire:'Un vrai délice !'}] },
  { id: 'b2', nom: 'Brownie fraise', photo: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=900', prix: 7, disponible: true, categorie: 'Brownies', description: 'Brownie au chocolat accompagné de notes fruitées de fraise.', quantiteRestante: 4, ingredients: [{nom:'Chocolat',allergene:true,quantiteRestante:400},{nom:'Fraises',allergene:false,quantiteRestante:250}], avis: [] },
  { id: 'cr1', nom: 'Crêpe chocolat', photo: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=900', prix: 7.5, disponible: true, categorie: 'Crêpes', description: 'Crêpe fine et légère, nappée de chocolat fondant.', quantiteRestante: 12, ingredients: [{nom:'Lait',allergene:true,quantiteRestante:1000},{nom:'Farine',allergene:true,quantiteRestante:500},{nom:'Œufs',allergene:true,quantiteRestante:12}], avis: [] },
  { id: 'cr2', nom: 'Crêpe fruits rouges', photo: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=900', prix: 8, disponible: true, categorie: 'Crêpes', description: 'Une crêpe gourmande garnie de fruits rouges et d’une touche de douceur.', quantiteRestante: 6, ingredients: [{nom:'Lait',allergene:true,quantiteRestante:1000},{nom:'Fruits rouges',allergene:false,quantiteRestante:300}], avis: [] }
];

@Injectable({ providedIn: 'root' })
export class BoutiqueService {
  private readonly produitsSignal = signal<Produit[]>(this.chargerProduits());
  private readonly panierSignal = signal<LignePanier[]>(this.chargerPanier());
  readonly produits = this.produitsSignal.asReadonly();
  readonly panier = this.panierSignal.asReadonly();
  readonly nombreArticles = computed(() => this.panierSignal().reduce((total, ligne) => total + ligne.quantite, 0));
  readonly total = computed(() => this.panierSignal().reduce((somme, ligne) => somme + ligne.produit.prix * ligne.quantite, 0));

  private chargerProduits(): Produit[] {
    const data = localStorage.getItem('dpG-produits');
    return data ? JSON.parse(data) as Produit[] : produitsDepart;
  }
  private chargerPanier(): LignePanier[] {
    const data = localStorage.getItem('dpG-panier');
    return data ? JSON.parse(data) as LignePanier[] : [];
  }
  private sauvegarder(): void {
    localStorage.setItem('dpG-produits', JSON.stringify(this.produitsSignal()));
    localStorage.setItem('dpG-panier', JSON.stringify(this.panierSignal()));
  }
  ajouterAuPanier(produit: Produit, quantite = 1): void {
    if (!produit.disponible || produit.quantiteRestante < quantite) return;
    const panier = [...this.panierSignal()];
    const ligne = panier.find(item => item.produit.id === produit.id);
    if (ligne) ligne.quantite += quantite;
    else panier.push({ produit, quantite });
    this.panierSignal.set(panier);
    this.sauvegarder();
  }
  modifierQuantite(id: string, quantite: number): void {
    if (quantite <= 0) this.supprimerDuPanier(id);
    else {
      this.panierSignal.update(panier => panier.map(l => l.produit.id === id ? {...l, quantite} : l));
      this.sauvegarder();
    }
  }
  supprimerDuPanier(id: string): void {
    this.panierSignal.update(panier => panier.filter(l => l.produit.id !== id));
    this.sauvegarder();
  }
  viderPanier(): void { this.panierSignal.set([]); this.sauvegarder(); }
  enregistrerProduit(produit: Produit): void {
    const existe = this.produitsSignal().some(p => p.id === produit.id);
    this.produitsSignal.update(liste => existe ? liste.map(p => p.id === produit.id ? produit : p) : [...liste, produit]);
    this.sauvegarder();
  }
  supprimerProduit(id: string): void {
    this.produitsSignal.update(liste => liste.filter(p => p.id !== id));
    this.sauvegarder();
  }
  diminuerStock(id: string, quantite: number): void {
    this.produitsSignal.update(liste => liste.map(p => p.id === id ? {...p, quantiteRestante: Math.max(0, p.quantiteRestante - quantite), disponible: p.quantiteRestante - quantite > 0} : p));
    this.sauvegarder();
  }
  get ingredients(): Ingredient[] {
    const tous = this.produitsSignal().flatMap(p => p.ingredients);
    return [...new Map(tous.map(i => [i.nom, i])).values()];
  }
}
