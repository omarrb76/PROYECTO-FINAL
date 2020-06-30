import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGraficasComponent } from './admin-graficas.component';

describe('AdminGraficasComponent', () => {
  let component: AdminGraficasComponent;
  let fixture: ComponentFixture<AdminGraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
