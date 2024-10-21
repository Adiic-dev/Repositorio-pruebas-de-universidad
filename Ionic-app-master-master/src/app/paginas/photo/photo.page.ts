import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  constructor(public photoService: PhotoService) { }
  addPhotoToGallery() {
    this.photoService.addNewToGallery();

  }
 async ngOnInit() {
    await this.photoService.loadSaved();
  }
  
}
