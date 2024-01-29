import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(``, Validators.required),
    password: new FormControl(``, Validators.required),
  });
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    // document.getElementById('navbar-nav')?.classList.add('d-none');
    // document.getElementById('filter')?.classList.add('d-none');
    // document.getElementById('categoryList')?.classList.add('d-none');
    // document.getElementById('category-nav')?.classList.remove('d-none');
    // document.getElementById('filter')?.classList.add('d-none');
    // document.getElementById('categoryList')?.classList.remove('d-none');
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    //toast için ng add @ngneat/hot-toast
    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Giriş Başarılı',
          // loading: 'Giriş Yapılıyor...',
          // error: (error) => {
          //   console.error('Login error:', error);
          //   return `There was an error: ${error.message || 'Unknown error'}`;
          // },
          //error: ({ message }) => `There was an error: ${message} `
          // error: `there was an error`,
        }),
        catchError((error) => {
          console.error('HTTP Error:', error.message);
          switch (error.code) {
            case 'auth/invalid-email':
              this.toast.error('Geçersiz bir mail adresi girdiniz');
              break;
            case 'auth/invalid-credential':
              this.toast.error('Lütfen mailinizi ve şifrenizi doğru giriniz');
              break;
            case 'auth/too-many-requests':
              this.toast.error(
                'Çok fazla hatalı giriş yaptınız. Lütfen daha sonra tekrar deneyiniz'
              );
              break;

            default:
              this.toast.error('Bir hata oluştu. Tekrar deneyiniz');
          }
          throw error;
        })
      )
      .subscribe(() => {
        // this.authService.currentUser$.pipe().subscribe((user) => {
        //   localStorage.setItem('user', JSON.stringify(user)); //şuanki user bilgisini kayıt ediyoruz
        // });
        this.router.navigate(['/home']);
      });
  }
}
