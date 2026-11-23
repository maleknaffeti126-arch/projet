import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoutiqueService } from '../services/boutique.service';
import { Produit } from '../models/models';
import { FormsModule } from '@angular/forms';


@Component({
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './boutique.components.html'
})
export class BoutiqueComponent {
    categories = ['Tout', 'Cookies', 'Crêpes', 'Brownies'];

  boutique = inject(BoutiqueService);

  recherche = signal('');
  categorie = signal('Tout');

  produitsFiltres = computed(() =>
    this.boutique.produits().filter(p =>
      (this.categorie() === 'Tout' || p.categorie === this.categorie()) &&
      p.nom.toLowerCase().includes(this.recherche().toLowerCase())
    )
  );

  ingredientsTexte(p: Produit): string {
    return p.ingredients.map(i => i.nom).join(', ') || 'Selon recette';
  }

  contientAllergenes(p: Produit): boolean {
    return p.ingredients.some(i => i.allergene);
  }

  ajouter(id: string) {
    const p = this.boutique.produits().find(x => x.id === id);

    if (p) {
      this.boutique.ajouterAuPanier(p);
    }
  }
}
