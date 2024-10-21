import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  constructor( private route:Router) { }
  
  async iniciar(){
      this.route.navigate(['/login']);  
      localStorage.getItem('usuario');
      localStorage.getItem('ingresado');

  }

  ngOnInit() {
  }

}
