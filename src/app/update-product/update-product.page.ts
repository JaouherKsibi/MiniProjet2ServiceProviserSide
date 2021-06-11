import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  product:any;
  listeCategories:any;
  constructor(private toastController: ToastController ,private fire:AngularFireAuth,private db:AngularFirestore,private route:ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.product=JSON.parse(params.special);

      }
    });
    this.getAllCategories();
   }
   getAllCategories(){
    this.db.collection("Category").snapshotChanges()
    .subscribe
    ( data=>{
      this.listeCategories=data.map(
        e=>{
          if(this.fire.auth.currentUser.uid== e.payload.doc.data()['idServiceProvider']){
          return{
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            idServiceProvider:e.payload.doc.data()['idServiceProvider'],
          }
        }}
      )
    })
  }
  UpdateProduct(){
    this.db.doc("Product/"+this.product.id).update({id:this.product.id,idCategory:this.product.idCategory,name:this.product.name,prix:this.product.prix,quantite:this.product.quantite});
    //this.router.navigateByUrl('/accueil');
    //this.router.navigate(['accueil'])
    this.presentToast("product Up to date ");

  }
  async presentToast(message1) {
    const toast = await this.toastController.create({
      message: message1,
      duration: 5000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
