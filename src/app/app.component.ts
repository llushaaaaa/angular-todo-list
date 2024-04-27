import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { Subject, filter, takeUntil } from 'rxjs';
import { ETitles } from '@enums/titles.enum';
import { ERoutes } from '@enums/routers.enum';
import { TodosService } from '@services/todos.service';

const TITLES: Record<ERoutes, ETitles> = {
  [ERoutes.LIST]: ETitles.TODO_LIST,
  [ERoutes.ADD]: ETitles.TODO_ADD,
  [ERoutes.FAVORITE]: ETitles.TODO_FAVORITE_LIST,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Todo List';

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private todosServicedo: TodosService) {}

  ngOnInit(): void {
    this.subscribeRouterEvents();
    this.todosServicedo.initializeTodos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private subscribeRouterEvents(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe((e) => {
        const { urlAfterRedirects } = e as NavigationEnd;
        this.title = TITLES[urlAfterRedirects.replace('/', '') as ERoutes];
      });
  }
}
