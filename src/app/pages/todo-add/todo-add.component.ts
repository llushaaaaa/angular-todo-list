import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WidgetComponent } from '@components/widget/widget.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TodosService } from '@services/todos.service';
import { DateTime } from 'luxon';
import { FormFieldsModule } from '@shared/components/form-fields/form-fields.module';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ITodo } from '@interfaces/todo.interface';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  standalone: true,
  imports: [
    WidgetComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent implements OnInit {
  public todoAddForm = new FormGroup<any>({});

  public todayDate = DateTime.local();

  constructor(
    private fb: FormBuilder,
    private todosService: TodosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public getFormControl(name: string): FormControl {
    return this.todoAddForm.get(name) as FormControl;
  }

  public onCreateTodo(): void {
    if (this.todoAddForm.invalid) {
      this.todoAddForm.markAllAsTouched();
      return;
    }

    const todo: ITodo = {
      id: crypto.randomUUID(),
      title: this.getFormControl('title').value,
      favorite: false,
      expirationAt: this.getExpirationDate(),
      createAt: DateTime.now().toISO(),
    };

    this.todosService.addTodo(todo);
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

  private getExpirationDate(): string {
    const fullDate: string = this.getFormControl('expirationDate').value;
    const fullTime: string = this.getFormControl('expirationTime').value;

    const month = Number(fullDate.slice(0, 2));
    const day = Number(fullDate.slice(2, 4));
    const year = Number(fullDate.slice(4));
    const hour = Number(fullTime.slice(0, 2));
    const minute = Number(fullTime.slice(2));

    return DateTime.now()
      .set({ month, day, year, hour, minute, second: 0, millisecond: 0 })
      .toISO();
  }
}
