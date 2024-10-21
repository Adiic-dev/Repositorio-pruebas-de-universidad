import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAuthPageRoutingModule } from './registro-auth-routing.module';

import { RegistroAuthPage } from './registro-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAuthPageRoutingModule
  ],
  declarations: [RegistroAuthPage]
})
export class RegistroAuthPageModule {}
