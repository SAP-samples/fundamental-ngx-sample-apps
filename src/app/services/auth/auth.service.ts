import { Injectable } from '@angular/core';
import { Router } from  '@angular/router';
import { AngularFireAuth } from  '@angular/fire/auth';
import {Observable, Observer, BehaviorSubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireUploadTask, AngularFireStorage} from '@angular/fire/storage';
import {finalize, tap} from 'rxjs/operators';
import "firebase/firestore";
import firebase from "firebase/app";
import {Account} from '../../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _loggedIn: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  private _account: BehaviorSubject<{first, last, images, email}> = 
  new BehaviorSubject<{first, last, images, email}>({first: null, last: null, images: null, email: null});
  percentage: Observable<any>;
  private task: AngularFireUploadTask;
  private downloadURL: string;

  constructor(
    public  afAuth: AngularFireAuth,
    public  router: Router,
    private cookie: CookieService,
    private _db: AngularFirestore,
    private _storage: AngularFireStorage) {
      afAuth.setPersistence('local');
      const user = this.cookie.get('userid');
      if (user) {
        this._loggedIn.next(true);
      }
    }

   get userObserLoginObservable() {
     return this._loggedIn;
   }

   async login(email: string, password: string) {
    let result = await this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
      this._loggedIn.next(true);
      this.cookie.set('userid', loginInfo.user.uid);
      const user = this._db.collection('users', ref => ref.where('id' , '==' , loginInfo.user.uid)).valueChanges();
      user.subscribe((account: Account[]) => {
        const userAccount: Account = account[0];
        this._account.next(
          {
            first: userAccount.firstName,
            last: userAccount.lastName,
            email: userAccount.email,
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

  async register(firstName:string, lastName:string, email: string, password: string, images: File[]) {
    let result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(loginInfo => {
          this._loggedIn.next(true);
          this.cookie.set('userid', loginInfo.user.uid);
          this.addProfile(false, firstName, lastName, email, loginInfo.user.uid, images).then(observable => {
            observable.subscribe(number => {

              if (number == 100) {
                const timer = setTimeout(() => {
                  const user = this._db.collection('users', ref => ref.where('id' , '==' , loginInfo.user.uid)).valueChanges();
                  user.subscribe((account: Account[]) => {
                    const userAccount: Account = account[0];
                    this._account.next(
                      {
                        first: userAccount.firstName,
                        last: userAccount.lastName,
                        email: userAccount.email,
                        images: userAccount.images[0].path
                      }
                    );
                    this.sendEmailVerification();
                  }, error => {
                  });
                }, 1000);
              }
            });
          });
      }).catch((error) => {
        console.log('invalid username and password');
      });
    }).catch((error) => {
      console.log('Registration could not be completed!');
    });
  }

  async sendEmailVerification() {
    await this.afAuth.currentUser.then (
      u => u.sendEmailVerification().then(
        () => {
          this.router.navigate(['/dashboard']);
        }
      )
    );
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout(){
    await this.afAuth.signOut();
    this.cookie.delete('userid', '/');
    this.cookie.delete('email', '/');
    this._account.next(
      {
        first: null,
        last: null,
        email: null,
        images: null
      }
    );
    this._loggedIn.next(false);
    this.router.navigate(['auth']);
  }

  get isLoggedIn(): boolean {
    const user = this.cookie.get('userid');
    if (user != '') {
      const user = this._db.collection('users', ref => ref.where('id' , '==' , this.cookie.get('userid'))).valueChanges();
      user.subscribe((account: Account[]) => {
        const userAccount: Account = account[0];
        this._account.next(
          {
            first: userAccount.firstName,
            last: userAccount.lastName,
            email: userAccount.email,
            images: userAccount.images[0].path
          }
        );
      }, error => {
      });
    }
    return  user != '';
  }

  async  loginWithGoogle(){
    await  this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this._loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      console.log('Action did not get completed with google');
    });
  }

  async addProfile(admin, firstName, lastName, userEmail, userid, profileImages) {
    const first = firstName;
    const last = lastName;
    const id = userid;
    const email = userEmail;
    const images = [];
    const obj = {admin, first, last, id, email, images};
    const regular = this._db.collection('users').doc(id);
    regular.set(Object.assign({}, obj));

    for await (const element of profileImages) {
      return this.addImage(element, id);
    }
  }

  private async addImage(file: any, id) {
    const date = new Date();
    const path = file.name + date.getMilliseconds().toString() +'.jpg'; // path
    const task = this._storage.upload(id + '/' + path, file);
    this.getUrl(task, id);
    return task.percentageChanges();
  }

  private async getUrl(snap: AngularFireUploadTask, id) {
    const url = (await snap).ref.getDownloadURL().then(url => {
      this._db.collection('users').doc(id).update({
        images: firebase.firestore.FieldValue.arrayUnion({path: url})
      });
    });
  }

  get account() {
    return this._account;
  }
}
