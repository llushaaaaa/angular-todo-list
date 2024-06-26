import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '@interfaces/todo.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { isToday } from '@shared/utils/is-today.util';
import { DateTime } from 'luxon';
import {
  BehaviorSubject,
  delay,
  take,
  tap,
  finalize,
  Observable,
  debounceTime,
} from 'rxjs';

const DELAY_MS = 700;

@Injectable({ providedIn: 'root' })
export class TodosService {
  private storage = inject(StorageMap);
  private router = inject(Router);

  public todos$ = new BehaviorSubject<ITodo[]>([]);

  public todosLoading$ = new BehaviorSubject<boolean>(true);
  public addTodoLoading$ = new BehaviorSubject<boolean>(false);
  public removeTodoLoading$ = new BehaviorSubject<boolean>(false);

  public get todos(): ITodo[] {
    return this.todos$.getValue();
  }

  public initializeTodos(): void {
    this.storage
      .get('todos')
      .pipe(
        take(1),
        delay(DELAY_MS),
        finalize(() => this.todosLoading$.next(false)),
        tap((items) => {
          const todos: ITodo[] = (items ?? []) as ITodo[];
          !todos.length && this.router.navigate(['/add']);
          this.todos$.next(todos);
        })
      )
      .subscribe();
  }

  public addTodo(todo: ITodo): void {
    this.addTodoLoading$.next(true);

    const todos = [...this.todos, todo] as ITodo[];

    this.setTodosInLocalStorage$(todos)
      .pipe(
        finalize(() => {
          this.addTodoLoading$.next(false);
          this.router.navigate(['/list']);
        })
      )
      .subscribe();
  }

  public removeTodo(todoId: string): void {
    this.removeTodoLoading$.next(true);

    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

    const todos = [
      ...this.todos.slice(0, todoIndex),
      ...this.todos.slice(todoIndex + 1, this.todos.length),
    ];

    this.setTodosInLocalStorage$(todos)
      .pipe(finalize(() => this.removeTodoLoading$.next(false)))
      .subscribe();
  }

  public toggleFavoriteTodo(todoId: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    const todo = this.todos[todoIndex];

    const todos = [
      ...this.todos.slice(0, todoIndex),
      { ...todo, favorite: !todo.favorite },
      ...this.todos.slice(todoIndex + 1, this.todos.length),
    ];

    this.setTodosInLocalStorage$(todos).pipe(debounceTime(300)).subscribe();
  }

  private setTodosInLocalStorage$(todos: ITodo[]): Observable<void> {
    return this.storage.set('todos', todos).pipe(
      take(1),
      delay(DELAY_MS),
      tap(() => this.todos$.next(todos))
    );
  }
}
