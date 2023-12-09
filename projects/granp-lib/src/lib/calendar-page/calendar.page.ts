import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonDatetime, IonHeader, IonNote, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ReservationCardComponent } from '../reservation-card/reservation-card.component';
import { ReservationResponse, ReservationStatus, Gender, Profession, Address } from '../../models';

@Component({
    selector: 'gp-calendar.page',
    standalone: true,
    imports: [CommonModule, IonHeader, IonTitle, IonToolbar, IonContent, IonDatetime, IonNote, ReservationCardComponent],
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.css'],
    encapsulation: ViewEncapsulation.None
})
export class CalendarPage {

    today = new Date().toISOString();

    reservationResponse1: ReservationResponse = {
        id: 'SignorPiomaggio',
        professional: {
            profilePicture: 'lollo',
            firstName: 'Antonio',
            lastName: 'Piomaggio',
            birthDate: '01/01/0001',
            age: 64,
            gender: Gender.Other,
            email: 'piomaggiotuttoattaccato@piomaggio.com',
            phoneNumber: '3334445566',
            description: 'Mi piacciono i droni',
            profession: Profession.Other,
            address: 'Via dei Droni, 3',
            isVerified: true,
            hourlyRate: 22,
            longTimeJob: false,
            shortTimeJob: true
        },
        customer: {
            profilePicture: 'd',
            elderFirstName: 'c',
            elderLastName: 'df',
            elderAddress: new Address(),
            elderBirthDate: 'sd',
            elderAge: 23,
            elderTelephoneNumber: 'dv',
            elderDescription: 'sd',
            firstName: 'sdc',
            lastName: 'sd',
            phoneNumber: 'wd',
            isElder: true
        },
        date: '2023-12-08',
        start: '18:08',
        end: '18:38',
        status: ReservationStatus.Accepted
    }

    reservationResponse2: ReservationResponse = {
        id: 'SignorPiomaggio',
        professional: {
            profilePicture: 'lollo',
            firstName: 'Antonio',
            lastName: 'Piomaggio',
            birthDate: '01/01/0001',
            age: 64,
            gender: Gender.Other,
            email: 'piomaggiotuttoattaccato@piomaggio.com',
            phoneNumber: '3334445566',
            description: 'Mi piacciono i droni',
            profession: Profession.Other,
            address: 'Via dei Droni, 3',
            isVerified: true,
            hourlyRate: 22,
            longTimeJob: false,
            shortTimeJob: true
        },
        customer: {
            profilePicture: 'd',
            elderFirstName: 'c',
            elderLastName: 'df',
            elderAddress: new Address(),
            elderBirthDate: 'sd',
            elderAge: 23,
            elderTelephoneNumber: 'dv',
            elderDescription: 'sd',
            firstName: 'sdc',
            lastName: 'sd',
            phoneNumber: 'wd',
            isElder: true
        },
        date: '2023-12-10',
        start: '18:08',
        end: '18:38',
        status: ReservationStatus.Declined
    }



    // Generate sample reservations
    allReservations: ReservationResponse[] = [
        this.reservationResponse1,
        this.reservationResponse2,
        this.reservationResponse1,
        this.reservationResponse2,
    ];

    // Filtered reservations
    reservations: ReservationResponse[] = [];

    // Occupied days
    occupiedDays: any[] = [];

    constructor() {
        // Filter reservations by date
        this.filterByDate(this.today);

        // Get occupied days from reservations
        this.occupiedDays = this.allReservations.filter(reservation => {
            return reservation.status !== ReservationStatus.Declined && reservation.status !== ReservationStatus.Cancelled
        }).map(reservation => {
            return {
                date: reservation.date,
                textColor: 'var(--ion-color-primary-contrast)',
                backgroundColor: 'var(--ion-color-primary)',
            }
        });
    }

    filterByDate(date: string) {
        // Filter reservations by date
        this.reservations = this.allReservations.filter(reservation => {
            const reservationDate = new Date(reservation.date).toLocaleDateString();
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
