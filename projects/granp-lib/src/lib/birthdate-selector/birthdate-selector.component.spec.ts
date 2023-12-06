import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdateSelectorComponent } from './birthdate-selector.component';

describe('BirthdateSelectorComponent', () => {
  let component: BirthdateSelectorComponent;
  let fixture: ComponentFixture<BirthdateSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BirthdateSelectorComponent]
    });
    fixture = TestBed.createComponent(BirthdateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
