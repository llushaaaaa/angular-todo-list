import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WidgetComponent } from '@components/widget/widget.component';

@Component({
  selector: 'app-widget-with-todos',
  standalone: true,
  imports: [WidgetComponent],
  templateUrl: './widget-with-todos.component.html',
  styleUrls: ['./widget-with-todos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosComponent {
  @Input() filter: 'all' | 'favorite' = 'all';
}
