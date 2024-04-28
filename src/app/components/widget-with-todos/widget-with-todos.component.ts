import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WidgetComponent } from '@components/widget/widget.component';
import { WidgetWithTodosItemComponent } from './widget-with-todos-item/widget-with-todos-item.component';
import { TodosService } from '@services/todos.service';

@Component({
  selector: 'app-widget-with-todos',
  standalone: true,
  imports: [CommonModule, WidgetComponent, WidgetWithTodosItemComponent],
  templateUrl: './widget-with-todos.component.html',
  styleUrls: ['./widget-with-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosComponent {
  @Input() filter: 'all' | 'favorite' = 'all';

  constructor(public todosService: TodosService) {}
}
