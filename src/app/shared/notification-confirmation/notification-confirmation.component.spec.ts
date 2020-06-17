import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfirmationComponent } from './notification-confirmation.component';

describe('NotificationConfirmationComponent', () => {
  let component: NotificationConfirmationComponent;
  let fixture: ComponentFixture<NotificationConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
