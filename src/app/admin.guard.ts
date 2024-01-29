import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Admin kontrolü yapılacak mantığı burada implement edin
    // let isAdmin = this.authService.getisAdmin();
    //console.log(isAdmin + ' admin mi');
    console.log(this.authService.getisAdmin());
    console.log(this.authService.admin());

    if (this.authService.getisAdmin() || this.authService.admin()) {
      return true; // Geçiş izni ver
    } else {
      // Admin değilse, login sayfasına yönlendir
      //window.alert('Bu sayfaya erişim izniniz yok!');
      this.router.navigate(['/home']);
      return false; // Geçiş izni verme
    }
  }
}
