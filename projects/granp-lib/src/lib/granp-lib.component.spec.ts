import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranpLibComponent } from './granp-lib.component';

describe('GranpLibComponent', () => {
  let component: GranpLibComponent;
  let fixture: ComponentFixture<GranpLibComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GranpLibComponent]
    });
    fixture = TestBed.createComponent(GranpLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
