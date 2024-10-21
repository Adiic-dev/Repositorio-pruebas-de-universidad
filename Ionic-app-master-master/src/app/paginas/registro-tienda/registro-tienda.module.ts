import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistroTiendaPageRoutingModule } from './registro-tienda-routing.module';
import { PhotoService } from 'src/app/services/photo.service';
import { RegistroTiendaPage } from './registro-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroTiendaPageRoutingModule
  ],
  declarations: [RegistroTiendaPage]
})
export class RegistroTiendaPageModule {}
