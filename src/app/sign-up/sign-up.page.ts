import { Component, OnInit , ViewChild} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceProvider } from "../Model/Model";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  serviceProviders:any=[];
  @ViewChild("id_f") file_id:any;
  storeName:string;
  email:string;
  phoneNumber:string;
  password:string;
  passwordReenter:string;
  storeIdentifier:string;

  constructor(private route:Router, private fire:AngularFireAuth,private firestore:AngularFirestore,private storage:AngularFireStorage,public alertController: AlertController) { }
  gotoLogin(){
    this.route.navigateByUrl("/login");
  }

  getServiceProviders() { this.firestore.collection("ServiceProviders").snapshotChanges()
    .subscribe(data=> { this.serviceProviders = data.map(e=> { return {
      id:e.payload.doc.id, 
      storeName:e.payload.doc.data()['storeName'],  
      email:e.payload.doc.data()['email'],
      phoneNumber:e.payload.doc.data()['phoneNumber'],
      password:e.payload.doc.data()['password'],
      storeIdentifier:e.payload.doc.data()['storeIdentifier'],
      logoUrl:e.payload.doc.data()['logoUrl']      };         })       }); } 


      ajouter(){
        if(this.verifAllFieldsNotEmpty(this.storeName,this.email,this.phoneNumber,this.password,this.passwordReenter,this.storeIdentifier, this.file_id)==false){
          this.presentAlertEmptyFieldError();
          return ;
        }
        else{
          if(this.verifPasswords(this.password,this.passwordReenter)==false){
            this.presentAlertPasswordsDontMatch();
          }
          else{
            var c=new ServiceProvider(this.storeName,this.phoneNumber,this.email,this.password,this.storeIdentifier);
            if (this.verifExistence(c)==true) {
              this.presentAlert();
            }
            else{
              this.fire.auth.createUserWithEmailAndPassword(this.email, this.password).then ( data=> {
                data.user.sendEmailVerification();
                const files=this.file_id.nativeElement.files[0];
                const filePath='/ServiceProvider/'+`${Date.now()}_${files.name}`;
                this.storage.upload(filePath,files);
                this.presentAlertOk();
            return this.firestore.collection("ServiceProvider").doc(data.user.uid).set({storeName:this.storeName ,email : this.email , phoneNumber:this.phoneNumber , storeIdentifier:this.storeIdentifier , logoUrl:filePath}) ;})       .catch( err=> { this.presentAlert()}) 
            }
          }
        }
        
        
      }
      verifAllFieldsNotEmpty(storeName:string,
        email:string,
        phoneNumber:string,
        password:string,
        passwordReenter:string,
        storeIdentifier:string,file_id:any){
          if(storeName==null||email==null||phoneNumber==null||password==null||passwordReenter==null||storeIdentifier==null||file_id==null){
            return false;
          }
          else{
            return true;
          }
        }
    
        verifPasswords(password1,password2){
          if (password1==password2) {
            return true;
          } else {
            return false;
          }
        }
    
        // this method returns true if the client exists and returns false if the client does'nt exist 
        verifExistence(sp:ServiceProvider){
          var i=false;
          this.getServiceProviders();
          this.serviceProviders.forEach(c => {
            if(c['storeName']==sp.getStoreName(),
            c["email"]==sp.getEmail(),c["phoneNumber"]==sp.getPhoneNumber(),
            c["password"]==sp.getPassword(),c["storeIdentifier"]==sp.getStoreIdentifier()){
              i=true ;// this client exists 
            }
          });
          return i;
        }
    
      //*********************************les alertes*********************************************// 
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
              this.route.navigateByUrl("/sign-up");
            }
          }]
        });
    
        await alert.present();
    
      }
    
      async presentAlertPasswordsDontMatch() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: "passwords don't match ",
          message: 'Please verify the passwords  .',
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/sign-up");
            }
          }]
        });
    
        await alert.present();
    
      }
      async presentAlert() {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'Error',
          subHeader: "Other Errors",
          message: 'Please enter other informations   .',
          buttons: [{
            text: 'ok',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigateByUrl("/sign-up");
            }
          }]
        });
    
        await alert.present();
    
      }
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
  ngOnInit() {
  }

}
