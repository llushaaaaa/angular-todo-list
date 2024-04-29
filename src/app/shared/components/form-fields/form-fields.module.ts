import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ErrorTextPipe } from '@shared/pipes/error-text.pipe';
import { TextareaComponent } from './textarea/textarea.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';

@NgModule({
  declarations: [TextareaComponent, DatepickerComponent, TimepickerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    ErrorTextPipe,
  ],
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  exports: [TextareaComponent, DatepickerComponent, TimepickerComponent],
})
export class FormFieldsModule {}
