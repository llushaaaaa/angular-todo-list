import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

const ERRORS: Record<string, string> = {
  required: 'This field is required',
};

@Pipe({ standalone: true, name: 'errorText' })
export class ErrorTextPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string | null {
    if (!errors) return null;

    return Object.keys(errors || [])
      .map((code) => ERRORS[code])
      .join(' ');
  }
}
