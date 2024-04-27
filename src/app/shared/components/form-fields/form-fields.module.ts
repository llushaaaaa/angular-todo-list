import { NgModule } from '@angular/core';
import { TextareaComponent } from './textarea/textarea.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [TextareaComponent, DatepickerComponent, TimepickerComponent],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  exports: [TextareaComponent, DatepickerComponent, TimepickerComponent],
})
export class FormFieldsModule {}
