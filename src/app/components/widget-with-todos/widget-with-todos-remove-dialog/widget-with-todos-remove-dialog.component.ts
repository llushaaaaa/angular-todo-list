import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-widget-with-todos-remove-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './widget-with-todos-remove-dialog.component.html',
  styleUrls: ['./widget-with-todos-remove-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosRemoveDialogComponent {
  public dialogRef = inject(MatDialogRef<WidgetWithTodosRemoveDialogComponent>);
}
