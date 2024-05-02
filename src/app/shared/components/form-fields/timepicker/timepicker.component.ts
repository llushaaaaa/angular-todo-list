import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { DateTime } from 'luxon';
import { formattedTime } from '@shared/utils/formatted-time.util';
import { isToday } from '@shared/utils/is-today.util';

@Component({
  selector: 'form-field-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerComponent implements OnInit, OnDestroy {
  private cdRef = inject(ChangeDetectorRef);

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

  public isDisabledTimepicker: boolean = true;

  private destroy$ = new Subject<void>();

  public get dateControlValue(): DateTime {
    return DateTime.fromJSDate(new Date(this.dateControl.value));
  }

  ngOnInit(): void {
    this.subscribeControlValueChanges();
    this.subscribeDateControlValueChanges();
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

          // const expirationDate = getExpirationDate(
          //   this.dateControl.value,
          //   this.control.value
          // );

          if (hours < 24 && minutes < 60) return;

          this.control.setErrors({ invalidTime: true });
        })
      )
      .subscribe();
  }

  private subscribeDateControlValueChanges(): void {
    this.dateControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.isDisabledTimepicker = this.dateControl.invalid;

          this.minDateTime = isToday(this.dateControlValue)
            ? DateTime.local()
            : DateTime.local().set({ hour: 0 });

          this.cdRef.markForCheck();
        })
      )
      .subscribe();
  }
}
