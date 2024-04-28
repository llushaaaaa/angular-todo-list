import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITodo } from '@interfaces/todo.interface';
import { TodosService } from '@services/todos.service';
import { calculateTimeRemaining } from '@shared/utils/calculate-time-remaining.util';
import { DateTime } from 'luxon';
import { Subscription, finalize, interval, map, takeWhile } from 'rxjs';

@Component({
  selector: 'app-widget-with-todos-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './widget-with-todos-item.component.html',
  styleUrls: ['./widget-with-todos-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetWithTodosItemComponent implements OnInit {
  @Input() todo: ITodo | null = null;
  @Input() isTodayTodo: boolean = true;
  @Input() isFirstItem: boolean = true;

  @Output() favorite = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();

  public exprirationAt: string = '00m 00s';

  public get expirationAtColumnName(): string {
    return this.isTodayTodo ? 'Time Left' : 'Expiration';
  }

  public get todoExpirationDate(): DateTime | null {
    if (!this.todo) return null;
    return DateTime.fromISO(this.todo.expirationAt);
  }

  constructor(
    public todosService: TodosService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.checkExpirationAt();
  }

  private checkExpirationAt(): void {
    if (!this.todo) return;

    if (!this.isTodayTodo && this.todoExpirationDate) {
      this.exprirationAt = this.todoExpirationDate.toFormat('LLL dd, yyyy');
      return;
    }

    this.startRemainingTime();
  }

  private startRemainingTime(): void {
    interval(1000)
      .pipe(
        map(() => calculateTimeRemaining(this.todoExpirationDate)),
        takeWhile((time) => time !== '00m 00s')
      )
      .subscribe((time) => {
        this.exprirationAt = time;
        this.cdRef.markForCheck();
      });
  }
}
