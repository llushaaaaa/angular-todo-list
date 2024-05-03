import { FormControl, FormGroup } from '@angular/forms';

export type TypedFormGroup<T> = FormGroup<{
  [field in keyof T]: FormControl<T[field] | null>;
}>;
