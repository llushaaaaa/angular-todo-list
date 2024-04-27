import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoFavoriteListComponent } from './todo-favorite-list.component';

const routes: Routes = [{ path: '', component: TodoFavoriteListComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TodoFavoriteListRoutes {}
