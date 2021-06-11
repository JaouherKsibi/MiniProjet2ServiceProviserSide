import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.page.html',
  styleUrls: ['./show-detail.page.scss'],
})
export class ShowDetailPage implements OnInit {
  user:any={id:"",storeName:"",email:"",password:"",phoneNumber:"",storeIdentifier:"",logoUrl:""};
  imurl:any;
  constructor(private router:Router , private auth:AuthService , private storage1:AngularFireStorage , private menu: MenuController) { 
    this.user= this.getUser();
  }
  getImageUrl(ref:string){
    this.imurl=this.storage1.ref(ref).getDownloadURL();
  }
   getUser(){
    const name =JSON.parse( localStorage.getItem('user'));
    this.user=name;
    this.getImageUrl(name.logoUrl);
    //console.log(name);
    return name;
  }

  ngOnInit() {
  }

}
