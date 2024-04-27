import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({ standalone: true, name: 'errorText' })
export class ErrorTextPipe implements PipeTransform {
  private readonly ERRORS: Record<string, string> = {
    required: 'This field is required',
    invalidDate: 'Incorrect date',
    invalidTime: 'Incorrect time',
    maxlength: 'Max length is {X} symbols.',
  };

  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    return Object.keys(errors || [])
      .map((code) => {
        if (errors && (code === 'maxlength' || code === 'minlength')) {
          return this.ERRORS[code].replace('{X}', errors[code].requiredLength);
        }

        return this.ERRORS[code];
      })
      .join(' ');
  }
}
