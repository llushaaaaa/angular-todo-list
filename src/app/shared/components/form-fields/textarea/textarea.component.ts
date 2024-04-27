import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'form-field-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class TextareaComponent {
  @Input() control: FormControl = new FormControl<string>('');
  @Input() label: string = '';
  @Input() placeholder: string = '';
}
