import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateTime } from 'luxon';

@Component({
  selector: 'form-field-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';

  private readonly dateFormat: string = 'MM/dd/yyyy';

  constructor(private cdRef: ChangeDetectorRef) {}

  public setDate(datepickerInputEvent: MatDatepickerInputEvent<Date>): void {
    const luxonDate = DateTime.fromJSDate(datepickerInputEvent.value!);
    const formattedDate = luxonDate.toFormat(this.dateFormat);
    this.control.setValue(formattedDate, { emitEvent: false });
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.cdRef.markForCheck();
  }
}
