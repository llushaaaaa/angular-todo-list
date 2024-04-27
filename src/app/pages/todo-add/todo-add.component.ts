import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WidgetComponent } from '@components/widget/widget.component';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss'],
  standalone: true,
  imports: [WidgetComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoAddComponent {}
