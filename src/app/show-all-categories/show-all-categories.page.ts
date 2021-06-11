import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-show-all-categories',
  templateUrl: './show-all-categories.page.html',
  styleUrls: ['./show-all-categories.page.scss'],
})
export class ShowAllCategoriesPage implements OnInit {
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  listeCategories:any=[];
  constructor(private fire:AngularFireAuth,private db:AngularFirestore,private router:Router , private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) {
    this.user= this.getUser();    
    this.getAllCategories();
  }
   getUser(){
    const name = JSON.parse(localStorage.getItem('user'));
    this.user=name;
    this.getImageUrl(name.logoUrl);
    return name;
  }
  getAllCategories(){
    //if (this.fire.auth.currentUser!=null) {
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
            image:this.storage1.ref(e.payload.doc.data()['image'],).getDownloadURL() ,
            imageRef:e.payload.doc.data()['image'],
          }
          console.log({
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            idServiceProvider:e.payload.doc.data()['idServiceProvider'],
          });
          
        }}
      )
    })
   // }
    
  }
  getImageUrl(ref:string){
    this.imurl=this.storage1.ref(ref).getDownloadURL();
  }
  allermodif(category){
    let navigationExtras:NavigationExtras={
      queryParams:{
        special:JSON.stringify({
          id:category.id,
          name:category.name,
          idServiceProvider:category.idServiceProvider,
          imageRef:category.imageRef
        })
      }
    }
    this.router.navigate(['/update-category'],navigationExtras);
  }
  ngOnInit() {
  }

}
