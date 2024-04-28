/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WidgetWithTodosRemoveDialogComponent } from './widget-with-todos-remove-dialog.component';

describe('WidgetWithTodosRemoveDialogComponent', () => {
  let component: WidgetWithTodosRemoveDialogComponent;
  let fixture: ComponentFixture<WidgetWithTodosRemoveDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetWithTodosRemoveDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetWithTodosRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
