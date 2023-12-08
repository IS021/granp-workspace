import { Component, Input, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem } from '@ionic/angular/standalone';

import { FilePicker } from '@capawesome/capacitor-file-picker';

@Component({
  selector: 'gp-certificate-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem],
  templateUrl: './certificate-selector.component.html',
  styleUrls: ['./certificate-selector.component.css']
})
export class CertificateSelectorComponent {

  @Input() certificate: string = '';
  @Output() certificateChange: EventEmitter<string> = new EventEmitter<string>();

  cdRef = inject(ChangeDetectorRef);

  /* Certificate picker */
  pickImages = async () => {
    const result = await FilePicker.pickImages({
      readData: true,
    });
    this.certificate = 'data:image/jpg;base64,' + result.files[0].data;
    this.certificateChange.emit(this.certificate);
    this.cdRef.detectChanges();
  };
}
