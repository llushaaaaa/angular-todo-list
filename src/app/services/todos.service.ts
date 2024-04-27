import { Injectable } from '@angular/core';
import { ITodo } from '@interfaces/todo.interface';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private _todos$ = new BehaviorSubject<ITodo[]>([]);

  public get todos$(): Observable<ITodo[]> {
    return this._todos$.asObservable();
  }

  public get todos(): ITodo[] {
    return this._todos$.getValue();
  }

  public set todos(value: ITodo[]) {
    this._todos$.next(value);
  }

  constructor(private storage: StorageMap) {}

  public initializeTodos(): void {
    this.storage
      .get<ITodo[]>('todos', { type: 'array' })
      .pipe(tap((todos) => (this.todos = todos as ITodo[])))
      .subscribe();
  }

  public addTodo(todo: ITodo): void {
    const newTodos = [...this.todos, todo] as ITodo[];
    this.storage.set('todos', newTodos).subscribe();
    this.todos = newTodos;
  }

  public removeTodo(todoId: string): void {}

  public makeFavoriteTodo(todoId: string): void {}
}
