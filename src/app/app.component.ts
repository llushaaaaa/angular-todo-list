import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Subject, filter, takeUntil } from 'rxjs';
import { ETitles } from '@enums/titles.enum';
import { ERoutes } from '@enums/routers.enum';
import { TodosService } from '@services/todos.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { HeaderComponent } from './layouts/header/header.component';

const TITLES: Record<ERoutes, ETitles> = {
  [ERoutes.LIST]: ETitles.TODO_LIST,
  [ERoutes.ADD]: ETitles.TODO_ADD,
  [ERoutes.FAVORITE]: ETitles.TODO_FAVORITE_LIST,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    ButtonComponent,
    MatProgressSpinnerModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private todosService = inject(TodosService);
  private router = inject(Router);

  public title = ETitles.TODO_LIST;

  public ETitles = ETitles;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.subscribeRouterEvents();
    this.todosService.initializeTodos();
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
