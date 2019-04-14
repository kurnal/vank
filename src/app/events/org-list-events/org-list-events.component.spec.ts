import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgListEventsComponent } from './org-list-events.component';

describe('OrgListEventsComponent', () => {
  let component: OrgListEventsComponent;
  let fixture: ComponentFixture<OrgListEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgListEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgListEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
