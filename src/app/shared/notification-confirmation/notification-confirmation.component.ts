import { Component, OnInit } from '@angular/core';
import {NotificationRef} from '@fundamental-ngx/core';

@Component({
  selector: 'app-notification-confirmation',
  templateUrl: './notification-confirmation.component.html',
  styleUrls: ['./notification-confirmation.component.scss']
})
export class NotificationConfirmationComponent implements OnInit {

  constructor(public notificationRef: NotificationRef) { }

  ngOnInit(): void {
  }

}
