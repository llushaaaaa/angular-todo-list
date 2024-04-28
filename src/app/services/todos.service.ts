import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ITodo } from '@interfaces/todo.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { isToday } from '@shared/utils/is-today.util';
import { DateTime } from 'luxon';
import { BehaviorSubject, delay, take, tap, finalize } from 'rxjs';

const DELAY_MS = 400;

@Injectable({ providedIn: 'root' })
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public todayTodos$ = new BehaviorSubject<ITodo[]>([]);
  public exceptTodayTodos$ = new BehaviorSubject<ITodo[]>([]);

  public disabledButtons$ = new BehaviorSubject<boolean>(false);

  public get todos(): ITodo[] {
    return this.todos$.getValue();
  }

  constructor(private storage: StorageMap, private router: Router) {}

  public initializeTodos(): void {
    this.storage
      .get('todos')
      .pipe(
        delay(DELAY_MS),
        take(1),
        tap((todos) => this.todos$.next((todos ?? []) as ITodo[])),
        tap(this.filterTodos)
      )
      .subscribe();
  }

  public addTodo(todo: ITodo): void {
    const todos = [...this.todos, todo] as ITodo[];

    this.setTodosInLocalStorage(todos, '/list');
  }

  public removeTodo(todoId: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

    const todos = [
      ...this.todos.slice(0, todoIndex),
      ...this.todos.slice(todoIndex, this.todos.length - 1),
    ];

    this.setTodosInLocalStorage(todos);
  }

  public toggleFavoriteTodo(todoId: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    const todo = this.todos[todoIndex];

    const todos = [
      ...this.todos.slice(0, todoIndex),
      { ...todo, favorite: !todo.favorite },
      ...this.todos.slice(todoIndex, this.todos.length - 1),
    ];

    this.setTodosInLocalStorage(todos);
  }

  private filterTodos = (): void => {
    const todayTodos: ITodo[] = [];
    const exceptTodayTodos: ITodo[] = [];

    this.todos.forEach((todo) => {
      const todoExprirationAt = DateTime.fromISO(todo.expirationAt);

      isToday(todoExprirationAt)
        ? todayTodos.push(todo)
        : exceptTodayTodos.push(todo);
    });

    this.todayTodos$.next(todayTodos);
    this.exceptTodayTodos$.next(exceptTodayTodos);
  };

  private setTodosInLocalStorage(todos: ITodo[], route?: string): void {
    this.disabledButtons$.next(true);

    this.todos$.next(todos);

    this.storage
      .set('todos', todos)
      .pipe(
        take(1),
        delay(DELAY_MS),
        tap(this.filterTodos),
        finalize(() => {
          this.disabledButtons$.next(false);
          route && this.router.navigate([route]);
        })
      )
      .subscribe();
  }
}
