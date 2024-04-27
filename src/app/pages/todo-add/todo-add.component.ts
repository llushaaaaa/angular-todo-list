import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  public today = DateTime.now();

  constructor(private fb: FormBuilder, private todosService: TodosService) {}

  ngOnInit(): void {
    this.initForm();
  }

  public getFormControl(name: string): FormControl {
    return this.todoAddForm.get(name) as FormControl;
  }

  public onCreateTodo(): void {
    // const todo: ITodo = {
    //   ...this.todoAddForm.value,
    //   experationDate:
    // };

    console.log(this.todoAddForm.get('expirationDate'));

    // this.todosService.addTodo(todo);
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
