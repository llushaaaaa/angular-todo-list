import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, filter, finalize, tap } from 'rxjs';
import { DateTime } from 'luxon';
import { WidgetComponent } from '@components/widget/widget.component';
import { ITodo } from '@interfaces/todo.interface';
import { isToday } from '@shared/utils/is-today.util';
import { TodosService } from '@services/todos.service';
import { WidgetWithTodosItemComponent } from './widget-with-todos-item/widget-with-todos-item.component';
import { WidgetWithTodosRemoveDialogComponent } from './widget-with-todos-remove-dialog/widget-with-todos-remove-dialog.component';
import { EFilter } from './widget-with-todos.enum';

@Component({
  selector: 'app-widget-with-todos',
  standalone: true,
  imports: [
    CommonModule,
    WidgetComponent,
    WidgetWithTodosItemComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './widget-with-todos.component.html',
  styleUrls: ['./widget-with-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosComponent implements OnInit, OnDestroy {
  @Input() filter: EFilter = EFilter.ALL;

  public todayTodos: ITodo[] = [];
  public exceptTodayTodos: ITodo[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    public readonly todosService: TodosService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeTodos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public removeTodo(todo: ITodo): void {
    const dialogRef = this.dialog.open(WidgetWithTodosRemoveDialogComponent, {
      width: '250px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      autoFocus: false,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((isRemove) => isRemove),
        finalize(() => this.cdRef.markForCheck()),
        tap(() => this.todosService.removeTodo(todo.id))
      )
      .subscribe();
  }

  public getTodosByFilter(todos: ITodo[] | null): ITodo[] {
    if (!todos) return [];
    if (this.filter === EFilter.ALL) return todos;

    return todos.filter((todo) => todo.favorite);
  }

  private subscribeTodos(): void {
    this.todosService.todos$.pipe(tap(this.filterTodos)).subscribe();
  }

  private filterTodos = (todos: ITodo[]): void => {
    const todayTodos: ITodo[] = [];
    const exceptTodayTodos: ITodo[] = [];

    todos.forEach((todo) => {
      const todoExprirationAt = DateTime.fromISO(todo.expirationAt);

      if (this.filter === EFilter.FAVORITE && !todo.favorite) return;

      isToday(todoExprirationAt)
        ? todayTodos.push(todo)
        : exceptTodayTodos.push(todo);
    });

    this.todayTodos = todayTodos;
    this.exceptTodayTodos = exceptTodayTodos;

    this.cdRef.markForCheck();
  };
}
