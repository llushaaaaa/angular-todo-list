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
import { DateTime } from 'luxon';
import { Subject, filter, takeUntil, tap } from 'rxjs';

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

  private destroy$ = new Subject<void>();

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
        filter((value) => value.length === 4),
        tap((value: string) => {
          const { hours, minutes } = formattedTime(value);

          if (hours < 24 && minutes < 60) return;

          this.control.setErrors({ invalidTime: true });
        })
      )
      .subscribe();
  }
}
