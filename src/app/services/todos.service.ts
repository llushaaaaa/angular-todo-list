import { Injectable } from '@angular/core';
import { ITodo } from '@interfaces/todo.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public todayTodos$ = new BehaviorSubject<ITodo[]>([]);
  public exceptTodayTodos$ = new BehaviorSubject<ITodo[]>([]);

  public get todos(): ITodo[] {
    return this.todos$.getValue();
  }

  constructor(private storage: StorageMap) {}

  public initializeTodos(): void {
    this.storage
      .get('todos')
      .pipe(
        take(1),
        tap((todos) => this.todos$.next((todos ?? []) as ITodo[])),
        tap(this.filterTodos)
      )
      .subscribe();
  }

  public addTodo(todo: ITodo): Observable<void> {
    const todos = [...this.todos, todo] as ITodo[];

    this.todos$.next(todos);

    return this.storage.set('todos', todos).pipe(tap(this.filterTodos));
  }

  public removeTodo(todoId: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

    const todos = [
      ...this.todos.slice(0, todoIndex),
      ...this.todos.slice(todoIndex, this.todos.length - 1),
    ];

    this.todos$.next(todos);

    this.storage
      .set('todos', todos)
      .pipe(take(1), tap(this.filterTodos))
      .subscribe();
  }

  public toggleFavoriteTodo(todoId: string): void {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    const todo = this.todos[todoIndex];

    const todos = [
      ...this.todos.slice(0, todoIndex),
      { ...todo, favorite: !todo.favorite },
      ...this.todos.slice(todoIndex, this.todos.length - 1),
    ];

    this.todos$.next(todos);

    this.storage
      .set('todos', todos)
      .pipe(take(1), tap(this.filterTodos))
      .subscribe();
  }

  public filterTodos = (): void => {
    const currentDay = DateTime.local();

    const todayTodos: ITodo[] = [];
    const exceptTodayTodos: ITodo[] = [];

    this.todos.forEach((todo) => {
      const todoExprirationAt = DateTime.fromISO(todo.expirationAt);

      currentDay.hasSame(todoExprirationAt, 'day')
        ? todayTodos.push(todo)
        : exceptTodayTodos.push(todo);
    });

    this.todayTodos$.next(todayTodos);
    this.exceptTodayTodos$.next(exceptTodayTodos);
  };
}
