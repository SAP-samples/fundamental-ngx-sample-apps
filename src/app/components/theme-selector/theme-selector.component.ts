import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_REF } from '@fundamental-ngx/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {LanguageService} from 'src/app/services/language/language.service';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private languageService: LanguageService) {}

  themes = [
    {
        id: 'sap_fiori_3',
        name: 'Fiori 3'
    },
    {
        id: 'sap_fiori_3_dark',
        name: 'Fiori 3 Dark'
    },
    {
        id: 'sap_fiori_3_hcb',
        name: 'High Contrast Black'
    },
    {
        id: 'sap_fiori_3_hcw',
        name: 'High Contrast White'
    },
    {
        id: 'sap_belize',
        name: 'Belize'
    }
  ];


  modes = [{
      id: 'cozy',
      name: 'Cozy'
  }, {
      id: 'compact',
      name: 'Compact'
  }];
  language: 'en'|'fr';
  options1: string[] = ['Fiori 3', 'Fiori Dark', 'High Contrast Black', 'High Contrast White'];
  options2: string[] = ['Cozy', 'Compact'];

  customForm:FormGroup;

  ngOnInit(): void {
    this.customForm = new FormGroup({
      selectControl1: new FormControl(this.dialogRef.data.theme, Validators.required),
      luigiUi: new FormControl(false),
      compact: new FormControl(false)
    });

    this.languageService.lang.subscribe(language => {
      this.language = language;
    });
  };

  closeModal() {
    event.preventDefault();
    this.languageService.updateLang(this.language);
    this.dialogRef.close( {theme: this.customForm.controls.selectControl1.value, luigi: this.customForm.controls.luigiUi.value, compact: this.customForm.controls.compact.value});
  };

  languageChange() {
    this.language === 'en' ? this.language = 'fr' : this.language = 'en';
  }

}
