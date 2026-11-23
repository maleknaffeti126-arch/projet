import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoutiqueService } from '../services/boutique.service';
@Component({
    standalone:true,
    imports:[FormsModule],
    templateUrl:'./personnalisation.component.html'})
export class PersonnalisationComponent { 
    boutique=inject(BoutiqueService);
    bases=this.boutique.produits().filter(p=>p.categorie==='Brownies'||p.categorie==='Cookies');
    base=signal(this.bases[0]?.id??'');
    couleur=signal('Rose');
    topping=signal('Aucune');
    message=signal('');
    produit=computed(()=>this.bases.find(p=>p.id===this.base()));
    total=computed(()=>(this.produit()?.prix??0)+({'Aucune':0,'Pépites de chocolat':1.5,'Fraises':2,'Noisettes':1.5,'Caramel':1}[this.topping()]??0));
    ajouter(){const p=this.produit();
    if(p)this.boutique.ajouterAuPanier({...p,nom:p.nom+' personnalisé ('+this.couleur()+', '+this.topping()+')',prix:this.total(),id:p.id+'-custom-'+Date.now()});
}
}
