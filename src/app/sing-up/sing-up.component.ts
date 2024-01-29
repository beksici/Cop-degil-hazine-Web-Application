import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, switchMap } from 'rxjs';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'sing-up',
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css',
})
export class SingUpComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private toast: HotToastService
  ) {}
  signUpForm = new FormGroup(
    {
      name: new FormControl(``, Validators.required),
      email: new FormControl(``, [Validators.required, Validators.email]),
      password: new FormControl(``, Validators.required),
      confirmPassword: new FormControl(``, Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );
  ngOnInit(): void {}
  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit() {
    const { name, email, password } = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    this.authService
      .signUp(name, email, password)
      .pipe(
        // switchMap(({ user: { uid } }) =>
        ///  this.usersService.addUser({ uid, email, displayName: name })
        //),
        this.toast.observe({
          success: 'Tebrikler! Başarılı bir şekilde kayıt oldunuz.',
          //  loading: 'Signing up...',
          //  error: ({ message }) => `${message}`,
        }),
        catchError((error) => {
          console.error('HTTP Error:', error.message);
          switch (error.code) {
            case 'auth/weak-password':
              this.toast.error('Şifre en az 6 karakterden oluşmalıdır');
              break;
            case 'auth/email-already-in-use':
              this.toast.error('Mail daha önce kayıt olmuş');
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
        this.router.navigate(['/home']);
      });
  }
}
