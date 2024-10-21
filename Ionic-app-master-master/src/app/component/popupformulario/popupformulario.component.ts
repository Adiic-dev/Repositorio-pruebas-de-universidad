import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-popupformulario',
  templateUrl: './popupformulario.component.html', 
  styleUrls: ['./popupformulario.component.scss']
})
export class PopupFormulario implements OnInit {
  @Input() tiempoRestante: number = 10; 
  tiempo: number = this.tiempoRestante; 
  intervalo: any; 

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.iniciarCuentaRegresiva(); 
  }

  iniciarCuentaRegresiva() {
    this.intervalo = setInterval(() => {
      this.tiempo--;
      if (this.tiempo <= 0) {
        this.cerrar(); 
      }
    }, 1000);
  }

  cerrar() {
    clearInterval(this.intervalo); 
    this.modalController.dismiss(); 
  }
}
