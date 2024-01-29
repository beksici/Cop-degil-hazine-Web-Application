import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User, user } from '@angular/fire/auth';
import { ImageUploadService } from '../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap, switchMap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ObjectDetectionService } from '../services/object-detection.service';
import Tesseract from 'tesseract.js';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  user$ = this.authService.currentUser$;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  imageUrl: string | null = null;
  recognizedText: string | null = null;
  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: HotToastService,
    private objectDetectionService: ObjectDetectionService,
    location: PlatformLocation,
    private router: Router
  ) {
    location.onPopState(() => {
      this.router.navigate(['home']);
    });
  }
  selectedImage: HTMLImageElement;
  ngOnInit(): void {
    // document.getElementById('login')?.classList.add('d-none');
    // document.getElementById('logout')?.classList.remove('d-none');
    // this.authService.currentUser$.pipe().subscribe((user) => {
    //   console.log(user?.getIdToken());
    // });
    this.user$.pipe().subscribe((user) => {
      if (user?.email == 'admin@gmail.com') {
        this.authService.setisAdmin(true);
        localStorage.setItem('user', 'admin@gmail.com');
        //password kontrolu şuan yok
        //  document.getElementById('create-category')?.classList.remove('d-none');
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // async onFileSelected(): Promise<void> {
  //   const file = this.fileInput?.nativeElement.files?.[0];
  //   if (!file) return;

  //   this.imageUrl = await this.readFileAsDataURL(file);
  //   this.recognizedText = await this.extractTextFromImage(this.imageUrl);
  // }

  // private readFileAsDataURL(file: File): Promise<string> {
  //   return new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onload = () => resolve(reader.result as string);
  //     reader.readAsDataURL(file);
  //   });
  // }

  // private async extractTextFromImage(imageUrl: string): Promise<string> {
  //   try {
  //     const { data } = await Tesseract.recognize(imageUrl, 'tur', {
  //       tessedit_char_whitelist:
  //         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@',
  //       logger: (info: any) => {
  //         // OCR işlemi tamamlandığında elde edilen toplu metin
  //         console.log(info);
  //         console.log(info.progress);
  //       },
  //     } as any);
  //     console.log(data);
  //     let counter = 0;
  //     data.text = '';
  //     for (let word of data.words) {
  //       console.log(word.confidence);
  //       if (word.confidence > 93) {
  //         data.text += word.text + ' ';
  //         counter++;
  //         if (counter == 6) {
  //           counter = 0;
  //           data.text += '\n';
  //         }
  //       }
  //     }
  //     console.log(data.text);
  //     const regex = /[<>~|[\]{}&^$]/g;
  //     data.text = data.text.replace(regex, '');
  //     console.log(data.text.length);

  //     if (data && data.text) {
  //       return data.text;
  //     } else {
  //       console.error('No text found.');
  //       return '';
  //     }
  //   } catch (error: any) {
  //     console.error('Error extracting text:', error.message);
  //     return '';
  //   }
  // }

  // async imageSelected(event: any) {
  //   let file = event.target.files[0];
  //   console.log(file);

  //   if (file) {
  //     //const reader = new FileReader();
  //     let imageUrl = URL.createObjectURL(file);
  //     this.selectedImage = new Image();
  //     this.selectedImage.src = imageUrl;
  //     console.log(this.selectedImage.src);

  //     //let image = document.getElementById('uploadedImage') as HTMLImageElement;

  //     // setTimeout(async () => {
  //     //   await this.objectDetectionService.loadModel().then(async () => {
  //     //     let predictions = await this.objectDetectionService.detectObjects();
  //     //     console.log(predictions);
  //     //     predictions = [];
  //     //   });
  //     // }, 2000);

  //     // reader.onload = async (e: any) => {
  //     //   console.log('reader onload');

  //     //   document
  //     //     .getElementById('uploadedImage')
  //     //     ?.setAttribute('src', e.target.result);
  //     //   await this.objectDetectionService.loadModell().then(() => {
  //     //     this.objectDetectionService.detectObjectss();
  //     //   });
  //     // };
  //     // const imageUrl = URL.createObjectURL(file);
  //     // this.selectedImage = new Image();
  //     // this.selectedImage.src = imageUrl;
  //     // console.log(this.selectedImage.src);

  //     // await this.objectDetectionService.loadModel();

  //     // const predictions = await this.objectDetectionService.detectObjects(
  //     //   this.selectedImage
  //     // );
  //     // predictions[0];
  //     // console.log(predictions[0].className);
  //   }
  // }
  // uploadImage(event: any, user: User) {
  //   this.imageUploadService.uploadImage(
  //     event.target.files[0],
  //     `images/${user.uid}`
  //   );
  //   // .pipe(
  //   //   this.toast.observe({
  //   //     loading: 'Uploading profile image...',
  //   //     success: 'Image uploaded successfully',
  //   //     error: 'There was an error in uploading the image',
  //   //   }),
  //   //   concatMap((photoURL) =>
  //   //     this.authService.updateProfileData({
  //   //       photoURL,
  //   //     })
  //   //   )
  //   // )
  //   // .subscribe();
  // }
  // // getImage(user: User) {
  // //   this.imageUploadService.getImages(`images/85PIICLnSqTXrcZKDKEAc2vzAlu1`);
  // // }
}
