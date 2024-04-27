import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';

@Component({
  selector: 'form-field-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnDestroy {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() minDateTime: DateTime<boolean> | string = '';

  private readonly dateFormat: string = 'MM/dd/yyyy';

  private destroy$ = new Subject<void>();

  public get minDate(): Date | null {
    if (!this.minDateTime) return null;
    return new Date(this.minDateTime.toString());
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setDate(datepickerInputEvent: MatDatepickerInputEvent<Date>): void {
    const luxonDate = DateTime.fromJSDate(datepickerInputEvent.value!);
    const formattedDate = luxonDate.toFormat(this.dateFormat);
    this.control.setValue(formattedDate, { emitEvent: false });
    this.control.markAsTouched();
    this.control.markAsDirty();
    this.cdRef.markForCheck();
  }
}
