import { Component, OnInit, Inject } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {DIALOG_REF,DialogRef} from '@fundamental-ngx/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  forgotPasswordForm: FormGroup = new FormGroup ({
    email: new FormControl ('', [Validators.required, Validators.email]),
  });

  forgotPasswordSubmit() {}
}
