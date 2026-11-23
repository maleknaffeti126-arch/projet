import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BoutiqueService } from '../services/boutique.service';
@Component({
    standalone:true,
    imports:[FormsModule,RouterLink],
    templateUrl:'./panier.component.html'})
export class PanierComponent { 
    boutique=inject(BoutiqueService); 
    nom=signal('');
    telephone=signal('');
    adresse=signal('');
    commander(){
        if(!this.nom().trim()||!this.telephone().trim()){
            alert('Veuillez saisir votre nom et votre téléphone.');
            return;}
        const commande={
            nom:this.nom(),
            telephone:this.telephone(),
            adresse:this.adresse(),
            articles:this.boutique.panier(),
            total:this.boutique.total(),
            date:new Date().toLocaleString()};
        const anciennes=JSON.parse(localStorage.getItem('dpG-commandes')||'[]') as unknown[];
        localStorage.setItem('dpG-commandes',JSON.stringify([...anciennes,commande]));
        for(const l of this.boutique.panier())
            if(!l.produit.id.includes('-custom-')&&!l.produit.id.includes('-box-'))this.boutique.diminuerStock(l.produit.id,l.quantite);
        this.boutique.viderPanier();
        alert('Merci '+this.nom()+' ! Votre commande a bien été enregistrée.');
        this.nom.set('');
        this.telephone.set('');
        this.adresse.set('');
    }
}
