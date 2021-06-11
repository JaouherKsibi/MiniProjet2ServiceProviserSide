import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'accueil',
    loadChildren: () => import('./accueil/accueil.module').then( m => m.AccueilPageModule)
  },
  {
    path: 'update-product',
    loadChildren: () => import('./update-product/update-product.module').then( m => m.UpdateProductPageModule)
  },
  {
    path: 'update-personal-infos',
    loadChildren: () => import('./update-personal-infos/update-personal-infos.module').then( m => m.UpdatePersonalInfosPageModule)
  },
  {
    path: 'show-products-by-category',
    loadChildren: () => import('./show-products-by-category/show-products-by-category.module').then( m => m.ShowProductsByCategoryPageModule)
  },
  {
    path: 'show-detail',
    loadChildren: () => import('./show-detail/show-detail.module').then( m => m.ShowDetailPageModule)
  },
  {
    path: 'show-all-categories',
    loadChildren: () => import('./show-all-categories/show-all-categories.module').then( m => m.ShowAllCategoriesPageModule)
  },
  {
    path: 'add-category',
    loadChildren: () => import('./add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'update-category',
    loadChildren: () => import('./update-category/update-category.module').then( m => m.UpdateCategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
