import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowAllCategoriesPageRoutingModule } from './show-all-categories-routing.module';

import { ShowAllCategoriesPage } from './show-all-categories.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowAllCategoriesPageRoutingModule
  ],
  declarations: [ShowAllCategoriesPage]
})
export class ShowAllCategoriesPageModule {}
