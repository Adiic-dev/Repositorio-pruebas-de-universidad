import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
})
export class AyudaComponent {
  constructor(private popoverController: PopoverController) {}

  cerrarAyuda() {
    this.popoverController.dismiss(); 
  }
}
