import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController, ModalController } from '@ionic/angular';
import { AyudaComponent } from '../../component/ayuda/ayuda.component';
import { PopupFormulario } from '../../component/popupformulario/popupformulario.component'; 
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
  animations: [
    trigger('circuloAnimacion', [
      state('inactivo', style({
        transform: 'scale(1)',
      })),
      state('activo', style({
        transform: 'scale(0)',
      })),
      transition('inactivo => activo', [
        animate('0.3s ease-out'),
      ]),
      transition('activo => inactivo', [
        animate('0.3s ease-in'),
      ]),
    ]),
  ],
})
export class FormularioPage implements OnInit {
  formulario: FormGroup;
  enviado = false; 
  tiempoRestante: number = 10;  
  intervalo: any;  

  constructor(
    private formBuilder: FormBuilder, 
    private popoverController: PopoverController,
    private modalController: ModalController 
  ) {
    this.formulario = this.formBuilder.group({
      nombreDuenio: ['', [Validators.required, Validators.minLength(3)]],
      apellidoDuenio: ['', [Validators.required, Validators.minLength(4)]],
      nombreEstablecimiento: ['', [Validators.required, Validators.minLength(5)]],
      direccion: ['', [Validators.required, Validators.minLength(10)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]],
    });
  }

  ngOnInit() {}

  subirImagen() {
    console.log('Subiendo imagen...');
  }

  subirPDF(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files) {
      const file = fileInput.files[0];
      console.log('Subiendo PDF:', file);
    }
  }

  async onSubmit() {
    if (this.formulario.valid) {
      this.enviado = true;
      await this.mostrarPopup(); 
      this.formulario.reset();
    }
  }

  async mostrarPopup() {
    const modal = await this.modalController.create({
      component: PopupFormulario,
      componentProps: { tiempoRestante: this.tiempoRestante }, 
    });
    await modal.present();

    this.iniciarCuentaRegresiva();
  }

  iniciarCuentaRegresiva() {
    this.tiempoRestante = 10;  
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante === 0) {
        this.cerrarPopup(); 
      }
    }, 1000);
  }

  cerrarPopup() {
    clearInterval(this.intervalo); 
    this.enviado = false; 
  }

  async abrirAyuda() {
    const popover = await this.popoverController.create({
      component: AyudaComponent, 
      translucent: true
    });
    await popover.present();
  }
}
