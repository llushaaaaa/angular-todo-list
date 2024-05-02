import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { interval, map, takeWhile, tap } from 'rxjs';
import { DateTime } from 'luxon';
import { ITodo } from '@interfaces/todo.interface';
import { TodosService } from '@services/todos.service';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { calculateTimeRemaining } from '@shared/utils/calculate-time-remaining.util';

@Component({
  selector: 'app-widget-with-todos-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, SkeletonComponent],
  templateUrl: './widget-with-todos-item.component.html',
  styleUrls: ['./widget-with-todos-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosItemComponent implements OnInit {
  public readonly todosService = inject(TodosService);
  private cdRef = inject(ChangeDetectorRef);

  @Input() todo: ITodo | null = null;
  @Input() isTodayTodo: boolean = true;
  @Input() isFirstItem: boolean = true;

  @Output() favorite = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  public exprirationAt: string = '00m 00s';
  public isExprirationAtLoading: boolean = true;
  public isRemainingTimeLessHour: boolean = false;

  public get expirationAtColumnName(): string {
    return this.isTodayTodo ? 'Time Left' : 'Expiration';
  }

  public get todoExpirationDate(): DateTime | null {
    if (!this.todo) return null;
    return DateTime.fromISO(this.todo.expirationAt);
  }

  ngOnInit(): void {
    this.checkExpirationAt();
  }

  private checkExpirationAt(): void {
    if (!this.todo) return;

    if (!this.isTodayTodo && this.todoExpirationDate) {
      this.exprirationAt = this.todoExpirationDate.toFormat('LLL dd, yyyy');
      this.isExprirationAtLoading = false;
      this.cdRef.markForCheck();
      return;
    }

    this.startRemainingTime();
  }

  private startRemainingTime(): void {
    interval(1000)
      .pipe(
        map(() => calculateTimeRemaining(this.todoExpirationDate)),
        tap((time) => {
          if (time.indexOf('h') !== -1) return;
          this.isRemainingTimeLessHour = true;
        }),
        takeWhile((time) => time !== '00m 00s')
      )
      .subscribe((time) => {
        this.exprirationAt = time;
        this.isExprirationAtLoading = false;
        this.cdRef.markForCheck();
      });
  }
}
