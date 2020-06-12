import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TexttospeechComponent } from './texttospeech.component';

describe('TexttospeechComponent', () => {
  let component: TexttospeechComponent;
  let fixture: ComponentFixture<TexttospeechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TexttospeechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TexttospeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
