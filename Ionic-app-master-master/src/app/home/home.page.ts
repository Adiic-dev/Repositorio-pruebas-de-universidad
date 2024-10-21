import { Component, OnInit,Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ToastController ,AlertController,} from '@ionic/angular';
import { FormBuilder,FormGroup,FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
   usuario:string=""
   contrasena:string=""
   rut:string=""
   formularioLogin:FormGroup;
  constructor(public mensaje:ToastController, 
              private route:Router, 
              public alerta:AlertController,
              public fb:FormBuilder,
              private storage: Storage,
              ) {
    this.formularioLogin=this.fb.group({
      'nombre': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
    })
  }
  
  async ingresar() {
    var f = this.formularioLogin.value;
    
    const usuario =await this.storage.get('usuario');

    if(usuario.nombre == f.nombre &&  usuario.password== f.password){
      this.storage.set('ingresado',true);
      this.route.navigate(['./login']); 
    }else{
      const alert = await this.alerta.create({
        header: 'Alerta',
        message: 'Informacion erronea o incompleta',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
  }
  async iniciar(){
     

}
 
  async ngOnInit() {
    const storage= await this.storage.create();
  }
}
