import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-registro-tienda',
  templateUrl: './registro-tienda.page.html',
  styleUrls: ['./registro-tienda.page.scss'],
})
export class RegistroTiendaPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public route: Router,
    private storage: Storage
  ) {
    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      rut: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+-[0-9kK]{1}$') 
      ]),
    });
  }

  async registrarse() {
    var f = this.formularioRegistro.value;

    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Información errónea o incompleta',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    } else {
      var usuario = {
        nombre: f.nombre,
        password: f.password,
        rut: f.rut,
        role: 'empresa',
      };
      this.route.navigate(['./login']);
    }

    await this.storage.set('usuario', usuario);
  }

  async ngOnInit() {
    const storage = await this.storage.create();
    const usuario = await this.storage.get('usuario');
    const ingresado = await this.storage.get('ingresado');
  }
}
