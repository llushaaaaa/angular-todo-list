import { FormControl } from '@angular/forms';

export interface ITodoAddForm {
  title: string | null;
  expirationDate: string | null;
  expirationTime: string | null;
}
