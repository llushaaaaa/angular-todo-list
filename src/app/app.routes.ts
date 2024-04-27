import { Routes } from '@angular/router';
import { ERoutes } from '@enums/routers.enum';
import { ETitles } from '@enums/titles.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: ERoutes.LIST,
    title: ETitles.TODO_LIST,
    loadChildren: () =>
      import('./pages/todo-list/todo-list.module').then(
        (m) => m.TodoListModule
      ),
  },
  {
    path: ERoutes.FAVORITE,
    title: ETitles.TODO_FAVORITE_LIST,
    loadChildren: () =>
      import('./pages/todo-favorite-list/todo-favorite-list.module').then(
        (m) => m.TodoFavoriteListModule
      ),
  },
  {
    path: ERoutes.ADD,
    title: ETitles.TODO_ADD,
    loadChildren: () =>
      import('./pages/todo-add/todo-add.module').then((m) => m.TodoAddModule),
  },
];
