import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel } from '@ionic/angular/standalone';

import { ReservationResponse } from '../../models';

@Component({
  selector: 'gp-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonLabel],
})
export class ReservationCardComponent {

    @Input() reservation?: ReservationResponse;
    @Input() showStatus: boolean = false;
    @Input() showButtons: boolean = false;
    @Input() forProfessional: boolean = false;

    toLocaleDateString(date?: string) {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    }

    acceptReservation() {
        console.log('Accepted reservation');
    }

    rejectReservation() {
        console.log('Rejected reservation');
    }

}
