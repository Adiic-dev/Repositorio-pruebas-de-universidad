import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  profileImage: string | null = null;

  constructor() { }

  ngOnInit() {
    console.log('Cargando imagen de perfil...');
    this.loadProfileImage();
  }

  async cambiarFoto() {
    const actionSheet = document.createElement('ion-action-sheet');
    actionSheet.header = 'Seleccionar Imagen';
    actionSheet.buttons = [
      {
        text: 'Tomar una foto',
        icon: 'camera',
        handler: async () => {
          await this.tomarFoto(CameraSource.Camera);
        }
      },
      {
        text: 'Seleccionar desde la galería',
        icon: 'image',
        handler: async () => {
          await this.tomarFoto(CameraSource.Photos);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
    ];
    document.body.appendChild(actionSheet);
    await actionSheet.present();
  }

  async tomarFoto(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: source
      });

      const imageUrl = image.webPath;

      if (imageUrl) {
        this.profileImage = imageUrl; 
        await this.saveProfileImage(imageUrl);
      }
    } catch (error) {
      console.error('Error al tomar o seleccionar la foto:', error);
    }
  }

  async saveProfileImage(imageUrl: string) {
    try {
      await Storage.set({
        key: 'profileImage',
        value: imageUrl
      });
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
    }
  }

  async loadProfileImage() {
    try {
      const { value } = await Storage.get({ key: 'profileImage' });
      console.log('Valor cargado de Storage:', value); 
      this.profileImage = value ? value : null; 
      console.log('profileImage:', this.profileImage); 
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  }
}
