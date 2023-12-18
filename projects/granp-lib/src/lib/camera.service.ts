import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  public async takePicture() {
    const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
    });

    if (!image || !image.base64String) {
        return;
    }

    let croppedImage = await this.cropAndResizeImage(image.base64String);

    return 'data:image/jpeg;base64,' + croppedImage;
  }

  private async cropAndResizeImage(imageBase64: string): Promise<string> {
    return new Promise((resolve) => {
      let img = new Image();

      img.onload = () => {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');

        let shortestSide = Math.min(img.width, img.height);

        canvas.width = 256;
        canvas.height = 256;

        ctx!.drawImage(img, 0, 0, shortestSide, shortestSide, 0, 0, 256, 256);

        resolve(canvas.toDataURL().split(',')[1]);
      };

      img.src = 'data:image/jpeg;base64,' + imageBase64;
    });
  }
  
}
