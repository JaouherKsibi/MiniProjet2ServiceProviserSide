import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowAllCategoriesPage } from './show-all-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ShowAllCategoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowAllCategoriesPageRoutingModule {}
