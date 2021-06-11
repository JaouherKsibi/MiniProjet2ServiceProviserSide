import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { MenuController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit ,OnDestroy{
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  listeCategories:any=[];
  listeProducts:any=[];
  listeProducts1:any=[];
  constructor(private fire:AngularFireAuth,private db:AngularFirestore,private router:Router ,private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController , private navController : NavController) { 
    
    this.user= this.getUser();
    this.getProducts();
    
  }
  getImageUrl(ref:string){
    this.imurl=this.storage1.ref(ref).getDownloadURL();
  }
   getUser(){
    const name = JSON.parse( localStorage.getItem('user'));
    this.user=name;
    if (name!=null) {
      if(name.logoUrl!=null){
        this.getImageUrl(name.logoUrl);
      }
      else if(name.imageUrl!=null){
        this.getImageUrl(name.imageUrl);
      }
    }
      
    //console.log(name);
    return name;
  }
  getProducts(){
    
    this.listeProducts1=[];
    this.db.collection("Category").snapshotChanges()
    .subscribe
    ( data=>{
      this.listeCategories=data.map(
        e=>{
          if(this.fire.auth.currentUser.uid== e.payload.doc.data()['idServiceProvider']){
            console.log({
              id:e.payload.doc.id,
              //name:e.payload.doc.data()['name'],
              idServiceProvider:e.payload.doc.data()['idServiceProvider'],
            }   );
            
          return{
            id:e.payload.doc.id,
            name:e.payload.doc.data()['name'],
            idServiceProvider:e.payload.doc.data()['idServiceProvider'],
          }          
        }
      
      }
      );
     // console.log(this.listeCategories);
      this.listeProducts1=[]
      console.log(this.listeProducts1);
      
      /****************************************** */
      this.listeCategories.forEach(category => {
        console.log(category.name);
        
        //console.log('mrigl');
        
        
        this.db.collection("Product").snapshotChanges()
      .subscribe
      ( data=>{

        //this.listeProducts1=[]
        this.listeProducts=data.map(
          e=>{
            if(category.id== e.payload.doc.data()['idCategory']){
              console.log('ok');
            this.listeProducts1.push({
              image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL(),
              imageRef:e.payload.doc.data()['image'],
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              prix:e.payload.doc.data()['prix'],
              idCategory:e.payload.doc.data()['idCategory'],
              quantite:e.payload.doc.data()['quantite'],
              categoryName:category.name
            }) 
              
            return{
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              prix:e.payload.doc.data()['prix'],
              idCategory:e.payload.doc.data()['idCategory'],
              quantite:e.payload.doc.data()['quantite'],
              categoryName:category.name
            }
            
            
          }
        }
        )
        
        console.log(this.listeProducts1);
      })
      
      });
      /****************************************** */
      //console.log(this.listeCategories);
      
      
    })
    /******************************************* */
    //console.log(this.listeCategories);
    /******************************************** */
  }
  delete(product:any){
    this.db.doc("Product/" + product.id).delete();
    this.getProducts();
  }

  allermodif(product:any){
    let navigationExtras:NavigationExtras={
      queryParams:{
        special:JSON.stringify({
        imageRef:product.imageRef,
        id:product.id,
        name:product.name,
        prix:product.prix,
        idCategory:product.idCategory,
        quantite:product.quantite,
        categoryName:product.categoryName})
      }
    }
    this.router.navigate(['/update-product'],navigationExtras);
  }
  ngOnInit() {
    
  }
  ngOnDestroy(): void {
    this.listeProducts1=null;
    
  }

}
