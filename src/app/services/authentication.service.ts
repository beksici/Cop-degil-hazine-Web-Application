import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  UserInfo,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, concatMap, from, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: Auth) {}
  currentUser$ = authState(this.auth);
  isAdmin = false;
  setisAdmin(b: boolean) {
    this.isAdmin = b;
  }
  getisAdmin() {
    return this.isAdmin;
  }
  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }
  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }

  updateProfileData(profileData: Partial<UserInfo>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not authenticated');
        return updateProfile(user, profileData);
      })
    );
  }
  // isAdmin() {
  //   this.currentUser$.forEach((user) => {
  //     if (user?.email == 'admin@gmail.com') {
  //       console.log(user?.email);
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   return false;
  // }

  admin() {
    let user = localStorage.getItem('user');
    return user;
  }
}
