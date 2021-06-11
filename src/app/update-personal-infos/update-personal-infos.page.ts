import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-update-personal-infos',
  templateUrl: './update-personal-infos.page.html',
  styleUrls: ['./update-personal-infos.page.scss'],
})
export class UpdatePersonalInfosPage implements OnInit {
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  user1:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  user1Id :any;
  constructor(public alertController: AlertController,private db:AngularFirestore,private fire:AngularFireAuth,private router:Router,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) {
    this.user= this.getUser();
    this.user1= this.getUser();
   }
   update(){
    //this.fire.auth.currentUser.updatePassword(this.user.password);
    let a=JSON.parse(localStorage.getItem('user'));
    this.user1Id=a.id;
      this.db.doc("ServiceProvider/"+this.user1Id).update(this.user);
      this.logoutServiceProvider();
      this.presentAlertConfirm1();
      
  }
  getImageUrl(ref:string){
    this.imurl=this.storage1.ref(ref).getDownloadURL();
  }
  async getUser(){
    const name = JSON.parse(localStorage.getItem('user'));
    this.user=name;
    this.getImageUrl(name.logoUrl);
    //console.log(name);
    return name;
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error!',
      message: 'week Password !!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.user=this.user1;
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  async presentAlertConfirm1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success !',
      message: "uou've just updated your acount !!!" ,
      buttons: [
        {
          text: 'ok',
          role: 'confirm',
          cssClass: 'secondary',
          handler: (blah) => {
            //this.db.doc("ServiceProvider/"+this.user1Id).update(this.user);
           // this.logoutServiceProvider();
            this.router.navigateByUrl('/login');
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }
  logoutServiceProvider(){
    this.auth.logout();
  }
  ngOnInit() {
  }

}
