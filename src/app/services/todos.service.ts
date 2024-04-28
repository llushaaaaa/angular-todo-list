import { Injectable } from '@angular/core';
import { ITodo } from '@interfaces/todo.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable, delay, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  public todos$ = new BehaviorSubject<ITodo[]>([]);
  public todayTodos$ = new BehaviorSubject<ITodo[]>([]);
  public exceptTodayTodos$ = new BehaviorSubject<ITodo[]>([]);

  private currentDay = DateTime.local();

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

  public addTodo(todo: ITodo): Observable<undefined> {
    const newTodos = [...this.todos$.getValue(), todo] as ITodo[];

    this.todos$.next(newTodos);

    return this.storage.set('todos', newTodos).pipe(tap(this.filterTodos));
  }

  public removeTodo(todoId: string): void {}

  public markFavoriteTodo(todoId: string): void {}

  public filterTodos = (): void => {
    const todayTodos: ITodo[] = [];
    const exceptTodayTodos: ITodo[] = [];

    this.todos$.getValue().forEach((todo) => {
      const todoExprirationAt = DateTime.fromISO(todo.expirationAt);

      this.currentDay.hasSame(todoExprirationAt, 'day')
        ? todayTodos.push(todo)
        : exceptTodayTodos.push(todo);
    });

    this.todayTodos$.next(todayTodos);
    this.exceptTodayTodos$.next(exceptTodayTodos);
  };
}
