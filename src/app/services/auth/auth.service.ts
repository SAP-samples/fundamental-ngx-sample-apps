import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import {Observable, Observer, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _loggedIn: Subject<any> = new Subject<any>();
  private _userObserLoginObservable = this._loggedIn.asObservable();

  constructor( public  afAuth:  AngularFireAuth, public  router:  Router, private cookie: CookieService) {}
   
   get userObserLoginObservable() {
     return this._userObserLoginObservable;
   }

   async login(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
      this._loggedIn.next(true);
      this.cookie.set("userid", loginInfo.user.uid);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('invalid username and password')
    })
  }

  async register(email: string, password: string) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
          this._loggedIn.next(true);
          this.cookie.set("userid", loginInfo.user.uid);
        this.router.navigate(['/dashboard']);
      }).catch((error) => {
        console.log('invalid username and password')
      })
    }).catch((error) => {
      console.log('Registration could not be completed!')
    });
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.currentUser.then ( 
      u => u.sendEmailVerification().then(
        () => {
          this.router.navigate(['auth']);
        }
      )
    )
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.cookie.delete('userid','/');
    this._loggedIn.next(false);
    this.router.navigate(['auth']);
  }

  get isLoggedIn(): boolean {
    const user = this.cookie.get("userid");
    return  user != '';
  }

  async  loginWithGoogle(){
    await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {
      this._loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('Action did not get completed with google')
    });
  }
}
