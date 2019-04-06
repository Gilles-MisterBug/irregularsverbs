import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVerbsComponent } from './list-verbs.component';

describe('ListVerbsComponent', () => {
  let component: ListVerbsComponent;
  let fixture: ComponentFixture<ListVerbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVerbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVerbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
