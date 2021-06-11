import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateCategoryPageRoutingModule } from './update-category-routing.module';

import { UpdateCategoryPage } from './update-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateCategoryPageRoutingModule
  ],
  declarations: [UpdateCategoryPage]
})
export class UpdateCategoryPageModule {}
