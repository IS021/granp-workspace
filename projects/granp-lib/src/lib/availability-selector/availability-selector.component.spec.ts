import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilitySelectorComponent } from './availability-selector.component';

describe('AvailabilitySelectorComponent', () => {
  let component: AvailabilitySelectorComponent;
  let fixture: ComponentFixture<AvailabilitySelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AvailabilitySelectorComponent]
    });
    fixture = TestBed.createComponent(AvailabilitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
