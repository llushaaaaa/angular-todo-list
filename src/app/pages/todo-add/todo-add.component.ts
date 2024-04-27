import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WidgetComponent } from '@components/widget/widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  standalone: true,
  imports: [
    WidgetComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent implements OnInit {
  public todoAddForm = new FormGroup<any>({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  public getFormControl(name: string): FormControl {
    return this.todoAddForm.get(name) as FormControl;
  }

  public onCreateTodo(): void {
    console.log(this.todoAddForm.value);
  }

  private initForm(): void {
    this.todoAddForm = this.fb.group({
      title: this.fb.control('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      expirationDate: this.fb.control('', Validators.required),
      expirationTime: this.fb.control('', Validators.required),
    });
  }
}
