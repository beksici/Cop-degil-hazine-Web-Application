import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Injectable({
  providedIn: 'root',
})
export class ObjectDetectionService {
  private model: mobilenet.MobileNet;

  // async loadModel() {
  //   console.log('model yüklenmeden önce');

  //   this.model = await mobilenet.load();
  //   console.log('model yüklendirdikten sonra');
  // }

  // async detectObjects(image: HTMLImageElement): Promise<any[]> {
  //   const imageTensor = tf.browser.fromPixels(image);
  //   const predictions = await this.model.classify(imageTensor);
  //   return predictions;
  // }

  async loadModel() {
    console.log('model yüklenmeden önce');
    if (!this.model) {
      this.model = await mobilenet.load();
    }
    console.log('model yüklendirdikten sonra');
    return this.model;
  }

  async detectObjects(): Promise<any[]> {
    const image = document.getElementById(
      'uploadedImageCreate'
    ) as HTMLImageElement;
    const imageTensor = tf.browser.fromPixels(image);
    const predictions = await this.model.classify(imageTensor);

    return predictions;
  }
}
