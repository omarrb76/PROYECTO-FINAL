import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsdialogComponent } from './notificationsdialog.component';

describe('NotificationsdialogComponent', () => {
  let component: NotificationsdialogComponent;
  let fixture: ComponentFixture<NotificationsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
