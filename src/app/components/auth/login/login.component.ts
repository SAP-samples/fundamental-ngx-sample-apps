import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {DialogService} from '@fundamental-ngx/core';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class:'fullPage'
}
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private _dialogService: DialogService) { }

  files: boolean = false; 

  loginForm: FormGroup = new FormGroup ({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)])
  });

  signupForm: FormGroup = new FormGroup ({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    file: new FormControl ([Validators.required, Validators.requiredTrue])
  });

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }

  forgotPassword(){
    const dialogRef = this._dialogService.open(ForgotPasswordComponent, {
      responsivePadding: true
  });

  dialogRef.afterClosed.subscribe(
      (result) => {
        this.authService.sendPasswordResetEmail(result);
      },
      (error) => {}
  );
  }

  signup() {
    this.authService.register(this.signupForm.get('email').value, this.signupForm.get('password').value, this.signupForm.get('file').value);
  }

  picturesSelected($event) {
    this.files = true;
    $event.forEach(element => {
      alert(element.name + 'uploaded');
    });
  }

  invalidFile() {
    console.log("File not valid. Use a .jpg!")
  }
}
