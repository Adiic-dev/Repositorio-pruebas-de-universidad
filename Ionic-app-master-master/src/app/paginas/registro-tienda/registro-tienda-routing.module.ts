import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroTiendaPage } from './registro-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroTiendaPageRoutingModule {}
