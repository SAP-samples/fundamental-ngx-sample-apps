import { Component, OnInit } from '@angular/core';
import {ModalRef} from '@fundamental-ngx/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public modalRef: ModalRef) { }

  ngOnInit() {
  }

}
