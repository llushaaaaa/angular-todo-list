import { NgModule } from '@angular/core';
import { TodoAddComponent } from './todo-add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: TodoAddComponent }];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class TodoAddRoutes {}
