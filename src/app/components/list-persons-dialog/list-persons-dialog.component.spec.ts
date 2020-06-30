import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonsDialogComponent } from './list-persons-dialog.component';

describe('ListPersonsDialogComponent', () => {
  let component: ListPersonsDialogComponent;
  let fixture: ComponentFixture<ListPersonsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
