import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validator,FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController, ToastController} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  formularioRegistro:FormGroup;
  foto: PhotoService = new PhotoService;

  constructor(public fb:FormBuilder, public alertController: AlertController, public route:Router, private storage:Storage, public photoService: PhotoService) { 
    this.formularioRegistro=this.fb.group({
      'nombre': new FormControl('',Validators.required),
      'password': new FormControl('',Validators.required),
      'confirmPassword': new FormControl('',Validators.required),
      'rut': new FormControl('',Validators.required),
    })

  }
  async registrarse() {
    const f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Información errónea o incompleta',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    }

    const usuario = {
      nombre: f.nombre,
      password: f.password,
      rut: f.rut,
      role: 'persona',
    };

    await this.storage.set('usuario', usuario); 
    this.route.navigate(['./login']);
  }

    addPhotoToGallery() {
      this.photoService.addNewToGallery();
  
    }
  async ngOnInit() {
    const storage=await this.storage.create()
    const usuario=await this.storage.get('usuario');
    const ingresado=await this.storage.get('ingresado');
  }

}
