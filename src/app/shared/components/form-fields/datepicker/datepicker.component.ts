import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'form-field-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit, OnDestroy {
  @Input() control: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() minDateTime: DateTime<boolean> | string = '';

  @ViewChild('datePicker')
  private datePicker!: MatDatepicker<Date>;

  private readonly dateFormat: string = 'MM/dd/yyyy';

  private destroy$ = new Subject<void>();

  public get minDate(): Date | null {
    if (!this.minDateTime) return null;
    return new Date(this.minDateTime.toString());
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeControlValueChanges();
  }

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

  private getLuxonDate(value: string): DateTime<boolean> {
    const formattedDate = value
      .split('')
      .map((number, i) => ([2, 4].includes(i) ? `/${number}` : number))
      .join('');

    return DateTime.fromFormat(formattedDate, this.dateFormat);
  }

  private subscribeControlValueChanges(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value: string) => {
          !this.control.touched && this.control.markAsTouched();

          if (value.length !== this.dateFormat.replace(/\//g, '').length) {
            this.control.setErrors({ invalidDate: true });
            return;
          }

          const formattedDate = this.getLuxonDate(value);

          if (!formattedDate.isValid || formattedDate < this.minDateTime) {
            this.control.setErrors({ invalidDate: true });
            return;
          }

          this.datePicker.select(formattedDate.toJSDate());
        })
      )
      .subscribe();
  }
}
