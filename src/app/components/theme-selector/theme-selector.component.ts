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

  options1: string[] = ['Fiori 3', 'Fiori Dark', 'High Contrast Black', 'High Contrast White'];
  options2: string[] = ['Cozy', 'Compact'];

  customForm = new FormGroup({
      selectControl1: new FormControl(this.options1[0], Validators.required),
      selectControl2: new FormControl(this.options2[0], Validators.required),
  });

  ngOnInit(): void {
  };

  closeModal() {
    event.preventDefault();
    this.dialogRef.close();
  };


}
