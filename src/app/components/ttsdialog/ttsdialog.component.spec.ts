import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsdialogComponent } from './ttsdialog.component';

describe('TtsdialogComponent', () => {
  let component: TtsdialogComponent;
  let fixture: ComponentFixture<TtsdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtsdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
