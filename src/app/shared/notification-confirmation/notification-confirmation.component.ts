import { Component, OnInit } from '@angular/core';
import {NotificationRef} from '@fundamental-ngx/core';
import {LanguageService} from 'src/app/services/language/language.service';

@Component({
  selector: 'app-notification-confirmation',
  templateUrl: './notification-confirmation.component.html',
  styleUrls: ['./notification-confirmation.component.scss']
})
export class NotificationConfirmationComponent implements OnInit {

  language: 'en' | 'fr' = 'en';

  constructor(public notificationRef: NotificationRef,private _lang: LanguageService) { }

  ngOnInit(): void {
    this._lang.lang.subscribe(language => {
      this.language = language;
    })
  }

}
