import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'app-show-products-by-category',
  templateUrl: './show-products-by-category.page.html',
  styleUrls: ['./show-products-by-category.page.scss'],
})
export class ShowProductsByCategoryPage implements OnInit {
  category:any=[];
  listeProducts:any=[];
  listeProducts1:any=[];
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  constructor(private storage1: AngularFireStorage , private fire:AngularFireAuth,private db:AngularFirestore,private route:ActivatedRoute,private router:Router) { 
     
  }
  getImageUrl(ref:string){
    this.imurl=this.storage1.ref(ref).getDownloadURL();
  }
  async getUser(){
    const name = JSON.parse(localStorage.getItem('user'));
    console.log(name);
    
    this.user=JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    
    this.getImageUrl(name.logoUrl);
    return name;
  }
  getProducts(){
    this.listeProducts1=[];
        this.db.collection("Product").snapshotChanges()
      .subscribe
      ( data=>{
        this.listeProducts=data.map(
          e=>{
            console.log(this.category.id);
            console.log(e.payload.doc.data()['idCategory']);
            
            console.log(this.category===e.payload.doc.data()['idCategory']);
            
            //if(this.category.id== e.payload.doc.data()['idCategory']){
              this.listeProducts1.push({
                id:e.payload.doc.id,
                name:e.payload.doc.data()['name'],
                prix:e.payload.doc.data()['prix'],
                image:this.storage1.ref(e.payload.doc.data()['image']).getDownloadURL(),
                imageRef:e.payload.doc.data()['image'],
                idCategory:e.payload.doc.data()['idCategory'],
                quantite:e.payload.doc.data()['quantite'],
                categoryName:this.category.name
              });
            return{
              id:e.payload.doc.id,
              name:e.payload.doc.data()['name'],
              prix:e.payload.doc.data()['prix'],
              idCategory:e.payload.doc.data()['idCategory'],
              quantite:e.payload.doc.data()['quantite'],
              categoryName:this.category.name
            }
            
            
          }//}
        )
        console.log(this.listeProducts1);
        
      })}
      delete(product:any){
        this.db.doc("Product/" + product.id).delete();
        this.getProducts();
      }
    
      allermodif(product:any){
        let navigationExtras:NavigationExtras={
          queryParams:{
            special:JSON.stringify(product)
          }
        }
        this.router.navigate(['/update-product'],navigationExtras);
      }
  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      if(params&&params.special){
        this.category=JSON.parse(params.special);

      }
    });
    console.log(this.category);
    
    this.getUser(); 
    this.getProducts();
    
  }

}
