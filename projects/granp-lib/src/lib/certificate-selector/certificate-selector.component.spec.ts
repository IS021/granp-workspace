import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateSelectorComponent } from './certificate-selector.component';

describe('CertificateSelectorComponent', () => {
  let component: CertificateSelectorComponent;
  let fixture: ComponentFixture<CertificateSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CertificateSelectorComponent]
    });
    fixture = TestBed.createComponent(CertificateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
