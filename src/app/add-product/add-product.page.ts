import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  name:string ;
  category:string;
  prix;string;
  quantite:number;
  @ViewChild("id_f") file_id:any;
  listeCategories:any=[];
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  constructor(private navCtrl:NavController,public toastController: ToastController,public alertController:AlertController,public loadingController: LoadingController,private fire:AngularFireAuth,private db:AngularFirestore,private router:Router ,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) {
    this.getAllCategories();
    this.user= this.getUser();
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
          console.log({
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            idServiceProvider:e.payload.doc.data()['idServiceProvider'],
          });
          
        }}
      )
    })
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



  verifAllFieldsEmpty(){
    if(this.name==null||this.file_id==null||this.category==null||this.prix==null){               
      return true;
    }
    else{
      return false;
    }
  }
  addProduct(){
    if(this.verifAllFieldsEmpty()==true){
      this.presentAlertEmptyFieldError();
      console.log();
      
    }
    else{
      const files=this.file_id.nativeElement.files[0];
      const filePath='/Product/'+`${Date.now()}_${files.name}`;
      console.log(files);
      console.log(filePath);
      
      
      this.storage1.upload(filePath,files);
      //this.presentAlertOk();
      this.db.collection("Product").add({ name: this.name,image:filePath,prix:this.prix,quantite:this.quantite,idCategory:this.category})
      .then( data => { })
      .catch( err => { /*console.log(err);*/ });
      this.presentLoading();
      this.presentToast();
      this.router.navigateByUrl('/add-product');
    
  }}
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 6000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'added succesfully.',
      duration: 5000
    });
    toast.present();
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
          this.router.navigateByUrl("/add-product");
        }
      }]
    });

    await alert.present();

  }
  ngOnInit() {
  }
  ionViewDidLoaded(){
    this.navCtrl.pop();
  }
}
