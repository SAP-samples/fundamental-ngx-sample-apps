import { Component, OnInit, Inject } from '@angular/core';
import {DialogRef, DIALOG_REF} from '@fundamental-ngx/core';
import {LanguageService} from 'src/app/services/language/language.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  language: 'en'| 'fr' = 'en'

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private _lang: LanguageService) { }

  ngOnInit() {
    this._lang.lang.subscribe(lang => {
      this.language = lang;
    })
  }

}
