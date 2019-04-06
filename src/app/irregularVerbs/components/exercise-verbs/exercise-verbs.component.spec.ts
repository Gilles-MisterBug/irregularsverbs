import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseVerbsComponent } from './exercise-verbs.component';

describe('ExerciseVerbsComponent', () => {
  let component: ExerciseVerbsComponent;
  let fixture: ComponentFixture<ExerciseVerbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseVerbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseVerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
