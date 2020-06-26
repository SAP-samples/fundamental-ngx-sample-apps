import { Component, OnInit, Inject } from '@angular/core';
import {DialogRef, DIALOG_REF} from '@fundamental-ngx/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) { }

  ngOnInit() {
    
  }

}
