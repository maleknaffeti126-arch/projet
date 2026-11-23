
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoutiqueService } from '../services/boutique.service';
import { Produit } from '../models/models';

interface CommandeAdmin {
  nom: string;
  telephone: string;
  date: string;
  total: number;
}

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl:'./admin.component.html'
})
export class AdminComponent {

  boutique = inject(BoutiqueService);

  connecte = signal(
    sessionStorage.getItem('dpG-admin') === 'oui'
  );

  email = signal('');
  motDePasse = signal('');

  formulaire = signal(false);
  editionId = signal('');

  nom = signal('');
  categorie = signal('Cookies');
  prix = signal(4);
  quantite = signal(5);

  photo = signal(
    'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900'
  );

  description = signal('Une douceur préparée avec amour.');

  stockTotal = () =>
    this.boutique.produits().reduce(
      (s, p) => s + p.quantiteRestante,
      0
    );

  disponibles = () =>
    this.boutique.produits().filter(
      p => p.quantiteRestante > 0
    ).length;

  stockFaible = () =>
    this.boutique.produits().filter(
      p => p.quantiteRestante <= 5
    ).length;

  commandes = signal<CommandeAdmin[]>(
    JSON.parse(
      localStorage.getItem('dpG-commandes') || '[]'
    ) as CommandeAdmin[]
  );

  connexion() {
    if (
      this.email() === 'malouka@douceurs.tn'|| this.email() === 'aloua@douceurs.tn' &&
      this.motDePasse() === 'gourmandes2026'
    ) {
      this.connecte.set(true);
      sessionStorage.setItem('dpG-admin', 'oui');
    } else {
      alert('Email ou mot de passe incorrect.');
    }
  }

  deconnexion() {
    this.connecte.set(false);
    sessionStorage.removeItem('dpG-admin');
  }

  nouveau() {
    this.editionId.set('');
    this.nom.set('');
    this.categorie.set('Cookies');
    this.prix.set(4);
    this.quantite.set(5);

    this.photo.set(
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=900'
    );

    this.description.set('Une douceur préparée avec amour.');
    this.formulaire.set(true);
  }

  modifier(p: Produit) {
    this.editionId.set(p.id);
    this.nom.set(p.nom);
    this.categorie.set(p.categorie);
    this.prix.set(p.prix);
    this.quantite.set(p.quantiteRestante);
    this.photo.set(p.photo);
    this.description.set(p.description);

    this.formulaire.set(true);
  }

  enregistrer() {
    if (
      !this.nom().trim() ||
      this.prix() < 0 ||
      this.quantite() < 0
    ) {
      alert('Vérifiez les champs du formulaire.');
      return;
    }

    const id = this.editionId() || 'p' + Date.now();

    const ancien = this.boutique.produits().find(
      p => p.id === id
    );

    this.boutique.enregistrerProduit({
      id: id,
      nom: this.nom(),
      categorie: this.categorie(),
      prix: this.prix(),
      quantiteRestante: this.quantite(),
      disponible: this.quantite() > 0,
      photo: this.photo(),
      description: this.description(),
      ingredients: ancien?.ingredients ?? [],
      avis: ancien?.avis ?? []
    });

    this.formulaire.set(false);
  }

  supprimer(id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.boutique.supprimerProduit(id);
    }
  }

  annuler() {
    this.formulaire.set(false);
  }
}
