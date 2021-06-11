import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Category } from './model/interfaces';
import { AuthService } from './services/auth.service';
import { GestionBaseDeDonneesService } from './services/gestion-base-de-donnees.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  listeCategories:Observable<Category[]>
  constructor(private bddService:GestionBaseDeDonneesService, private navCtrl:NavController , private router:Router , private authService:AuthService,private menuController:MenuController, private loadingController:LoadingController) {
    this.listeCategories=this.getAllCategories();
  }
  async logout(){
    const loading =await this.loadingController.create({
      spinner:"crescent",
      showBackdrop:true
    });
    loading.present();
    this.menuController.close();
    this.authService.logout();
    loading.dismiss();
  }
  resetPassword(){
    this.authService.resetPassword();
    this.menuController.close();
  }
  goToUpdateSP(){
    this.router.navigateByUrl('/update-personal-infos');
    this.menuController.close();
  }
  goHome(){
    this.router.navigateByUrl('/accueil')
    this.menuController.close();
  }
  gotoCategory1(lv){
    console.log(lv);
    
    let navigationExtras:NavigationExtras={
      queryParams:{
        special:JSON.stringify(lv)
      }
    }
    this.menuController.close();
    this.router.navigate(['/show-products-by-category'],navigationExtras);
  }
  seePersonalInfos(){
    this.router.navigateByUrl('show-detail');
    this.menuController.close();
  }
  goToAllCategories(){
    this.menuController.close();
    this.router.navigateByUrl('show-all-categories');
  }
  goToAddCat(){
    this.menuController.close();
    this.router.navigateByUrl('add-category');
  }
  goToAddProduct(){
    this.menuController.close();
    this.navCtrl.pop();
    this.router.navigateByUrl('add-product');
  }
  getAllCategories(): Observable<Category[]> {
    return this.bddService.getAllCategories().snapshotChanges()
    .pipe(
    map(res => {
      return res.map(element => {
    return  {
      idServiceProvider:element.payload.doc.data()['idServiceProvider'],
    id:element.payload.doc.id,
    name:element.payload.doc.data()['name'],
    image:element.payload.doc.data()['image']
  } as Category
    
    });
    }));
    }
}
