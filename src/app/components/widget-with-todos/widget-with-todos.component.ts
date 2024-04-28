import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { WidgetComponent } from '@components/widget/widget.component';
import { WidgetWithTodosItemComponent } from './widget-with-todos-item/widget-with-todos-item.component';
import { TodosService } from '@services/todos.service';
import { MatDialog } from '@angular/material/dialog';
import { WidgetWithTodosRemoveDialogComponent } from './widget-with-todos-remove-dialog/widget-with-todos-remove-dialog.component';
import { ITodo } from '@interfaces/todo.interface';
import { filter, finalize, tap } from 'rxjs';

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

  constructor(
    public todosService: TodosService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef
  ) {}

  public removeTodo(todo: ITodo): void {
    const dialogRef = this.dialog.open(WidgetWithTodosRemoveDialogComponent, {
      width: '250px',
      enterAnimationDuration: '150ms',
      exitAnimationDuration: '150ms',
      autoFocus: false
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((isRemove) => isRemove),
        finalize(() => this.cdRef.markForCheck()),
        tap(() => this.todosService.removeTodo(todo.id))
      )
      .subscribe();
  }
}
