
import { Component, computed, inject, signal } from '@angular/core';
import { BoutiqueService } from '../services/boutique.service';

@Component({
  standalone: true,
  templateUrl: './box.component.html'
})
export class BoxComponent {
  boutique = inject(BoutiqueService);
  selection = signal<Record<string, number>>({});
  nombre = computed(() =>
    Object.values(this.selection()).reduce((a, b) => a + b, 0)
  );
  total = computed(() =>
    this.boutique.produits().reduce(
      (s, p) => s + (this.selection()[p.id] || 0) * p.prix,
      0
    )
  );
  ajouter(id: string) {
    const p = this.boutique.produits().find(x => x.id === id);
    if (!p) return;
    this.selection.update(s => ({
      ...s,
      [id]: Math.min((s[id] || 0) + 1, p.quantiteRestante)
    }));
  }
  retirer(id: string) {
    this.selection.update(s => ({
      ...s,
      [id]: Math.max((s[id] || 0) - 1, 0)
    }));
  }
  valider() {
    const articles = this.boutique.produits().filter(
      p => (this.selection()[p.id] || 0) > 0
    );
    for (const p of articles) {
      const q = this.selection()[p.id] ?? 0;

      this.boutique.ajouterAuPanier(
        {
          ...p,
          id: p.id + '-box-' + Date.now(),
          nom: 'Box – ' + p.nom,
          prix: p.prix
        },
        q
      );
    }

    this.selection.set({});
  }
}
