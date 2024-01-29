import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: Storage) {}

  uploadImages(fileList: FileList, path: string) {
    for (let i = 0; i < fileList.length; i++) {
      this.uploadImage(fileList[i], path + '/' + i);
    }
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));

    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
  getImages(path: string, adNo: string) {
    const storageRef = ref(this.storage, path);
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        //console.log(url);
        const img = document.getElementById(adNo);
        img?.setAttribute('src', url);
        return;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }

  getImagesProduct(path: string, imageIdNumber: string) {
    const storageRef = ref(this.storage, path);
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        // console.log(url);
        const img = document.getElementById(imageIdNumber);
        img?.setAttribute('src', url);
        // let divCarouselItem = document.createElement('div');
        // divCarouselItem.classList.add('carousel-item');
        // let img = document.createElement('img');
        // img?.classList.add('d-block w-100');
        // img?.setAttribute('src', url);
        // document
        //   .getElementById('carousel-inner')
        //   ?.appendChild(divCarouselItem)
        //   ?.appendChild(img);
        // document
        //   .getElementById('carousel-inner')
        //   ?.firstElementChild?.classList.add('active');
        return;
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }
}
