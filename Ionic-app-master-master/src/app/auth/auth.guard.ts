import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import {AlertController,} from '@ionic/angular';
@Injectable({
     providedIn: 'root',
})

export class AuthGuard{
  constructor(private storage:Storage, private route:Router, private alertController:AlertController){
    this.init();

  }
  async init(){
    await this.storage.create();
  }
  canActivate: CanActivateFn = async (route,state) => {
    const isLogged = await this.storage.get('ingresado');

    if(isLogged){
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: '¡Ya tienes una sesion iniciada!',
        buttons: [{
          text:'ok',
          role:'ok',
        },{
         text:'cerrar sesion',
         role:'cerrar_sesion',
         handler: () =>{
          this.storage.set('ingresado',false)
         }
        }],
        
      });
      await alert.present();
      return this.route.createUrlTree(['/login'])
     
    }
    else{
      return true;
    }
  }
}