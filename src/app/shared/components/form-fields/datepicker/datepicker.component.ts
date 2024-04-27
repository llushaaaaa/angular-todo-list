import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-field-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
