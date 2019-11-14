import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingDatepickerComponent } from './testing-datepicker.component';

describe('TestingDatepickerComponent', () => {
  let component: TestingDatepickerComponent;
  let fixture: ComponentFixture<TestingDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
