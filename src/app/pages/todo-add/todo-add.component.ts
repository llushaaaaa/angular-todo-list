import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
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
import { MatIconModule } from '@angular/material/icon';
import { TodosService } from '@services/todos.service';
import { DateTime } from 'luxon';
import { FormFieldsModule } from '@shared/components/form-fields/form-fields.module';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ITodo } from '@interfaces/todo.interface';
import { getExpirationDate } from '@shared/utils/get-expiration-date.util';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    WidgetComponent,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    ButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent implements OnInit, OnDestroy {
  public todoAddForm = new FormGroup<any>({});

  public todayDateWithTime = DateTime.local();
  public todayDateWithoutTime = this.todayDateWithTime.set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });

  private destroy$ = new Subject<void>();

  constructor(
    public readonly todosService: TodosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getFormControl(name: string): FormControl {
    return this.todoAddForm.get(name) as FormControl;
  }

  public onCreateTodo(): void {
    const fullDate: string = this.getFormControl('expirationDate').value;
    const fullTime: string = this.getFormControl('expirationTime').value;

    const expirationAt = String(getExpirationDate(fullDate, fullTime).toISO());

    const todo: ITodo = {
      expirationAt,
      id: crypto.randomUUID(),
      title: this.getFormControl('title').value,
      favorite: false,
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
}
