import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonLabel, NavController } from '@ionic/angular/standalone';

import { ReservationResponse } from '../../models';
import { ReservationService } from '../reservation.service';
import { LibConfigService } from '../granp-lib.module';

@Component({
  selector: 'gp-reservation-card',
  templateUrl: './reservation-card.component.html',
  styleUrls: ['./reservation-card.component.css'],
  standalone: true,
  imports: [CommonModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonLabel],
})
export class ReservationCardComponent {

    reservationService = inject(ReservationService);
    navCtrl = inject(NavController);
    libConfig = inject(LibConfigService);

    @Input() reservation?: ReservationResponse;
    @Input() showStatus: boolean = false;
    @Input() showButtons: boolean = false;
    forProfessional = this.libConfig.role === 'professional';

    @Output() onAction = new EventEmitter<void>();

    toLocaleDateString(date?: string) {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    }

    // To locale time string (hh:mm)
    toLocaleTimeString(date?: string) {
        if (!date) return '';
        return new Date(date).toLocaleTimeString().slice(0, 5);
    }

    acceptReservation() {
        if (!this.reservation) return;

        this.reservationService.accept(this.reservation?.id).then(() => {
            console.log('Accepted reservation');
            this.onAction.emit();
        });
    }

    rejectReservation() {
        if (!this.reservation) return;

        this.reservationService.reject(this.reservation?.id).then(() => {
            console.log('Rejected reservation');
            this.onAction.emit();
        });
    }

    showInfo() {
        if (!this.reservation) return;

        this.navCtrl.navigateForward('/info-reservation/' + this.reservation.id);
    }

}
