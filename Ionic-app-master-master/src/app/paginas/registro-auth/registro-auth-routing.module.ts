import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAuthPage } from './registro-auth.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAuthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAuthPageRoutingModule {}
