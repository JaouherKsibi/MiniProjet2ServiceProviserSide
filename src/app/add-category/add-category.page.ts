import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Client } from '../Model/Model';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  name:string ;
  @ViewChild("id_f") file_id:any;
  user:Client;
  constructor(private fire:AngularFireAuth,public toastController: ToastController,public loadingController: LoadingController,public alertController:AlertController,private route:Router,private storage:AngularFireStorage,private firestore:AngularFirestore,private menu: MenuController) { }
  verifAllFieldsEmpty(){
    if(this.name==null||this.file_id==null){               
      return true;
    }
    else{
      return false;
    }
  }
  addCategory(){
    if(this.verifAllFieldsEmpty()==true){
      this.presentAlertEmptyFieldError();
      console.log();
      
    }
    else{
      const files=this.file_id.nativeElement.files[0];
      const filePath='/Category/'+`${Date.now()}_${files.name}`;
      this.storage.upload(filePath,files);
      //this.presentAlertOk();
      this.firestore.collection("Category").add({ name: this.name,image:filePath,idServiceProvider:this.fire.auth.currentUser.uid})
      .then( data => { })
      .catch( err => {  });
      this.presentLoading();
      this.presentToast();
      this.route.navigateByUrl('/add-category');
    
  }}
  async presentAlertOk() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: "Congratulations!you've just joined us ! .",
      buttons: [{
        text: 'ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.route.navigateByUrl("/login");
        }
      }]
    });

    await alert.present();

  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async presentAlertEmptyFieldError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Umpty Field',
      message: 'Please fill all fields .',
      buttons: [{
        text: 'ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.route.navigateByUrl("/add-category");
        }
      }]
    });

    await alert.present();

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'added succesfully.',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
