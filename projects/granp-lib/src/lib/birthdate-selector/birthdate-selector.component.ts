import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatetime, IonInput, IonItem, IonModal } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

import { format, parseISO } from 'date-fns';

@Component({
  selector: 'gp-birthdate-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonInput, IonModal, IonDatetime],
  templateUrl: './birthdate-selector.component.html',
  styleUrls: ['./birthdate-selector.component.css']
})
export class BirthdateSelectorComponent {

    @Input() birthdate: string = '';
    @Output() birthdateChange: EventEmitter<string> = new EventEmitter<string>();

    showPicker = false;

    setBirthdate(event: CustomEvent) {
        this.birthdate = format(
            parseISO(event.detail.value),
            'yyyy-MM-dd'
        );
        this.showPicker = false;
        this.birthdateChange.emit(this.birthdate);
    }
}
