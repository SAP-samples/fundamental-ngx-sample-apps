import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { DialogRef, DIALOG_REF } from '@fundamental-ngx/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language/language.service';

import { ThemeServiceOutput, ThemesService } from "@fundamental-ngx/core";
import { SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss'],
  providers: [ThemesService]
})
export class ThemeSelectorComponent implements OnInit {

  themes = this._themesService.themes;
  selectedValue1: string;
  cssUrl: SafeResourceUrl;
  cssCustomUrl: SafeResourceUrl;

  @Output()
  themeChanged = new EventEmitter<ThemeServiceOutput>();

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef, private languageService: LanguageService, private _themesService: ThemesService) {}

  modes = [{
      id: 'cozy',
      name: 'Cozy'
  }, {
      id: 'compact',
      name: 'Compact'
  }];

  selectTheme(selectedTheme: string): void {
    this.cssUrl = this._themesService.setTheme(selectedTheme);
    this.cssCustomUrl = this._themesService.setCustomTheme(selectedTheme);

    this.themeChanged.emit({
      themeUrl: this.cssCustomUrl,
      customThemeUrl: this.cssUrl
    });
  }

  language: 'en'|'fr';
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
