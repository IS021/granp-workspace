import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonDatetime, IonHeader, IonNote, IonTitle, IonToolbar, LoadingController } from '@ionic/angular/standalone';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { ReservationResponse, ReservationStatus, Gender, Profession, Address } from '../../models';
import { ReservationService } from '../reservation.service';

@Component({
    selector: 'gp-calendar.page',
    standalone: true,
    imports: [CommonModule, IonHeader, IonTitle, IonToolbar, IonContent, IonDatetime, IonNote, ReservationCardComponent],
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarPage {

    reservationService = inject(ReservationService);
    loading = inject(LoadingController);

    allReservations: ReservationResponse[] = [];

    // Filtered reservations
    reservations: ReservationResponse[] = [];

    // Occupied days
    occupiedDays: any[] = [];

    // Today's date
    today = new Date().toISOString();

    constructor() {}

    ionViewWillEnter() {
    //ngOnInit() {
        // Get reservations
        this.loading.create({
            message: 'Carico prenotazioni...'
        }).then(loading => {
            loading.present();

            this.reservationService.getAll().then(reservations => {
                this.allReservations = reservations;

                console.log('All reservations', this.allReservations);

                // Filter reservations by date
                this.filterByDate(this.today);

                // Get occupied days from reservations
                this.occupiedDays = this.allReservations.filter(reservation => {
                    return reservation.status !== ReservationStatus.Declined && reservation.status !== ReservationStatus.Cancelled
                }).map(reservation => {
                    return {
                        date: reservation.start.split('T')[0],
                        textColor: 'var(--ion-color-primary-contrast)',
                        backgroundColor: 'var(--ion-color-primary)',
                    }
                });

                loading.dismiss();
            });
        });

    }


    filterByDate(date: string) {
        // Filter reservations by date
        this.reservations = this.allReservations.filter(reservation => {
            const reservationDate = new Date(reservation.start).toLocaleDateString();
            const targetDate = new Date(date).toLocaleDateString();

            // console.log(reservationDate, targetDate);

            return reservationDate === targetDate;
        });
    }

    dateChanged(event: CustomEvent) {
        // Filter reservations by date
        this.filterByDate(event.detail.value);
    }

}
