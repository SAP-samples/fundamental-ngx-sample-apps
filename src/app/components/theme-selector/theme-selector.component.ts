import { Component, OnInit, Inject } from '@angular/core';
import { DialogRef, DIALOG_REF } from '@fundamental-ngx/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-theme-selector',
  templateUrl: './theme-selector.component.html',
  styleUrls: ['./theme-selector.component.scss']
})
export class ThemeSelectorComponent implements OnInit {

  constructor(@Inject(DIALOG_REF) public dialogRef: DialogRef) {}

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

  options1: string[] = ['Fiori 3', 'Fiori Dark', 'High Contrast Black', 'High Contrast White'];
  options2: string[] = ['Cozy', 'Compact'];

  customForm:FormGroup;

  ngOnInit(): void {
    this.customForm = new FormGroup({
      selectControl1: new FormControl(this.dialogRef.data.theme, Validators.required),
      selectControl2: new FormControl(this.dialogRef.data.mode, Validators.required),
      luigiUi: new FormControl(false),
  });
  };

  closeModal() {
    event.preventDefault();
    this.dialogRef.close( {theme: this.customForm.controls.selectControl1.value, mode: this.customForm.controls.selectControl2.value, luigi: this.customForm.controls.luigiUi.value});
  };


}
