import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';

@Component({
  selector: 'form-field-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() minDateTime: DateTime<boolean> | string = '';

  constructor(private cdRef: ChangeDetectorRef) {}

  public setTime(time: string): void {
    this.control.setValue(time);
    this.cdRef.markForCheck();
  }
}
