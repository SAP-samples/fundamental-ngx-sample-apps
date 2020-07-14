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
import {Account} from '../../models/account.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private _account: BehaviorSubject<{images, email}> = new BehaviorSubject<{images, email}>({images: null, email: null});
  percentage: Observable<any>;
  private task: AngularFireUploadTask;
  private downloadURL: string;

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
      const user = this._db.collection('users', ref => ref.where('id' , '==' , loginInfo.user.uid)).valueChanges();
      user.subscribe((account: Account[]) => {
        const userAccount: Account = account[0];
        this._account.next(
          {
            email: userAccount.email.charAt(0).toUpperCase(),
            images: userAccount.images[0].path
          }
        );
      }, error => {
      });

      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('invalid username and password');
    });
  }

  async register(email: string, password: string, images) {
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
          this._loggedIn.next(true);
          this.cookie.set("userid", loginInfo.user.uid);
          this.addProfile(email, loginInfo.user.uid, images).then(res => {
            alert('helloInnder');
            const user = this._db.collection('users', ref => ref.where('id' , '==' , loginInfo.user.uid)).valueChanges();
            user.subscribe((account: Account[]) => {
              const userAccount: Account = account[0];
              this._account.next(
                {
                  email: userAccount.email.charAt(0).toUpperCase(),
                  images: userAccount.images[0].path
                }
              );
              this.router.navigate(['/dashboard']);
            }, error => {
            });
          });
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
    this.cookie.delete('userid','/');
    this.cookie.delete('email','/');
    this._account.next(
      {
        email: null,
        images: null
      }
    );
    this._loggedIn.next(false);
    this.router.navigate(['auth']);
  }

  get isLoggedIn(): boolean {
    const user = this.cookie.get("userid");
    if (user != '') {
      const user = this._db.collection('users', ref => ref.where('id' , '==' , this.cookie.get("userid"))).valueChanges();
      user.subscribe((account: Account[]) => {
        const userAccount: Account = account[0];
        this._account.next(
          {
            email: userAccount.email.charAt(0).toUpperCase(),
            images: userAccount.images[0].path
          }
        );
      }, error => {
      });
    }
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

  async addProfile(userEmail, userid, profileImages) {
    const id = userid;
    const email = userEmail;
    let images = [];
    const obj = {id, email, images};
    let regular = this._db.collection('users').doc(id);
    regular.set(Object.assign({}, obj));

    for await (const element of profileImages) {
      this.addImage(element, id);
      alert("Image uploaded");
    }
    alert('image finish');

    return new Promise(resolve => {
      resolve(true);
    });
  }

  private async addImage(file: any, id) {
    const date = new Date();
    const path = file.name + date.getMilliseconds().toString()+".jpg"; //path
    const snap = await this._storage.upload(id + '/' + path, file);
    this.getUrl(snap, id);
    const ref = this._storage.ref(path);

    // const date = new Date();
    // const path = file.name + date.getMilliseconds().toString()+".jpg"; //path
    // const task = await this._storage.upload(id + '/' + path, file).snapshotChanges();
    // task.subscribe(result => {
    //   console.log(result);
    //   debugger;
    //   this.getUrl(result, id);
    // })
    // // const snap = await this._storage.upload(id + '/' + path, file);
    // const ref = this._storage.ref(path);


    alert('uploaded');

    return new Promise(resolve => {
      resolve(true);
    });
  }

  private async getUrl(snap: firebase.storage.UploadTaskSnapshot, id) {
    const url = await snap.ref.getDownloadURL();
    this.downloadURL = url;  //store the URL
    console.log(this.downloadURL);
    this._db.collection('users').doc(id).update({
      images: firestore.FieldValue.arrayUnion({path: this.downloadURL})
    });
  }


  get downloadUrl() {
    return this.downloadURL;
  }

  get account() {
    return this._account;
  }
}
