import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { formattedTime } from '@shared/utils/formatted-time.util';
import { getExpirationDate } from '@shared/utils/get-expiration-date.util';
import { DateTime } from 'luxon';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'form-field-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent implements OnInit, OnDestroy {
  @Input() control: FormControl = new FormControl();
  @Input() dateControl: FormControl = new FormControl();
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() mask: string = '';
  @Input() minDateTime: DateTime<boolean> | string = '';

  public readonly timepickerTheme = {
    container: { bodyBackgroundColor: '#d7e3ff', buttonColor: '#3f51b5' },
    dial: { dialBackgroundColor: '#3f51b5' },
    clockFace: { clockHandColor: '#3f51b5' },
  };

  private destroy$ = new Subject<void>();

  public get isNeededMinDateTime(): boolean {
    return this.dateControl.touched && this.dateControl.valid;
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeControlValueChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public setTime(time: string): void {
    this.control.setValue(time);
    this.cdRef.markForCheck();
  }

  private subscribeControlValueChanges(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((value: string) => {
          !this.control.touched && this.control.markAsTouched();

          if (value.length !== 4) {
            this.control.setErrors({ invalidTime: true });
            return;
          }

          const { hours, minutes } = formattedTime(value);

          const expirationDate = getExpirationDate(
            this.dateControl.value,
            this.control.value
          );

          if (hours < 24 && minutes < 60) return;

          this.control.setErrors({ invalidTime: true });
        })
      )
      .subscribe();
  }
}
