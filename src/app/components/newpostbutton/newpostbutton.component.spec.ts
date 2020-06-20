import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpostbuttonComponent } from './newpostbutton.component';

describe('NewpostbuttonComponent', () => {
  let component: NewpostbuttonComponent;
  let fixture: ComponentFixture<NewpostbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpostbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpostbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
