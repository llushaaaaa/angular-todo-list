import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-field-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
})
export class TimepickerComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
