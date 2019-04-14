import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateStudentsComponent } from './rate-students.component';

describe('RateStudentsComponent', () => {
  let component: RateStudentsComponent;
  let fixture: ComponentFixture<RateStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
