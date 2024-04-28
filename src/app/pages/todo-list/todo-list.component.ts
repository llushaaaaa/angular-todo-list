import { Component, OnInit } from '@angular/core';
import { WidgetWithTodosComponent } from '@components/widget-with-todos/widget-with-todos.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [WidgetWithTodosComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
