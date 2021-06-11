import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.page.html',
  styleUrls: ['./update-category.page.scss'],
})
export class UpdateCategoryPage implements OnInit {
  category:any;
  constructor(private toastController : ToastController,private fire:AngularFireAuth,private db:AngularFirestore,private route:ActivatedRoute,private router:Router) {
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.category=JSON.parse(params.special);

      }
    });
   }
   updateCategory(){
    this.db.doc("Category/"+this.category.id).update({id:this.category.id,name:this.category.name});
    this.presentToast("Category updated")
    //this.router.navigateByUrl('/accueil');
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
