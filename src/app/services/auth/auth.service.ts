import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import {Observable, Observer, BehaviorSubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireUploadTask, AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import { firestore } from 'firebase/app';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  snapshot: Observable<any>;
  private task: AngularFireUploadTask;
  downloadURL: string;

  constructor( 
    public  afAuth: AngularFireAuth,
    public  router: Router,
    private cookie: CookieService,
    private _db: AngularFirestore,
    private _storage: AngularFireStorage) {
      afAuth.setPersistence('session');
      const user = this.cookie.get("userid");
      if (user) {
        this._loggedIn.next(true);
      }
    }
   
   get userObserLoginObservable() {
     return this._loggedIn;
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

  async register(email: string, password: string, images) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
          debugger;
          this._loggedIn.next(true);
          this.cookie.set("userid", loginInfo.user.uid);
          this.addProfile(email, loginInfo.user.uid, images);
        // this.router.navigate(['/dashboard']);


      }).catch((error) => {
        console.log('invalid username and password');
      });
    }).catch((error) => {
      console.log('Registration could not be completed!');
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
    );
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

  addProfile(userEmail, userid, profileImages) {
    const id = userid;
    const email = userEmail;
    let images = [];
    const obj = {id, email, images};
    let regular = this._db.collection('users').doc(id);
    regular.set(Object.assign({}, obj));

    profileImages.forEach(element => {
      this.addImage(element, id);
      alert("Image uploaded");
    });
  }

  private async addImage(file: any, id) {
    const date = new Date();
    let downloadUrl;

    const path = date.getMilliseconds().toString()+".jpg"; //path
    console.log(path);
    const ref = this._storage.ref(path);
    // task = this._storage.upload(path, file);
    ref.put(file).then(() => {
      let regular = this._db.collection('users').doc(id);
      // downloadUrl = ref.getDownloadURL().toPromise();
      let storageUrl;
      downloadUrl = ref.getDownloadURL().subscribe(url => {storageUrl = url});
      regular.update({
        images: firestore.FieldValue.arrayUnion({path: path})
      });
    });
    alert('uploaded');
  }
}
