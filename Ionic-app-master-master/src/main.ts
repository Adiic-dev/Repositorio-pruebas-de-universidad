import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AppModule } from './app/app.module';
import { Camera, CameraResultType } from '@capacitor/camera';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if(environment.production){
  enableProdMode}  
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

 defineCustomElements(window)

 const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  })
  var imageUrl = image.webPath;
};;