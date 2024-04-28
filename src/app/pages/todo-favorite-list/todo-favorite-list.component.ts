import { Component } from '@angular/core';
import { WidgetWithTodosComponent } from '@components/widget-with-todos/widget-with-todos.component';

@Component({
  selector: 'app-todo-favorite-list',
  standalone: true,
  imports: [WidgetWithTodosComponent],
  templateUrl: './todo-favorite-list.component.html',
  styleUrls: ['./todo-favorite-list.component.scss'],
})
export class TodoFavoriteListComponent {}
