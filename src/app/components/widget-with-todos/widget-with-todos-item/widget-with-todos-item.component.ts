import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITodo } from '@interfaces/todo.interface';

@Component({
  selector: 'app-widget-with-todos-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './widget-with-todos-item.component.html',
  styleUrls: ['./widget-with-todos-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosItemComponent {
  @Input() todo: ITodo | null = null;

  @Output() favorite = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
}
