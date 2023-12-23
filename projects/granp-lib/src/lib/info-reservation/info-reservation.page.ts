import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { personOutline, medicalOutline, calendarOutline, timeOutline, ellipsisHorizontal, checkmarkOutline, closeOutline, trashOutline, chatboxOutline } from 'ionicons/icons';
import {
    IonBackButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar,
    IonButton,
    NavController,
    LoadingController
} from '@ionic/angular/standalone';
import { ReservationResponse, Gender, Profession, ReservationStatus, Address } from '../../models'
import { addIcons } from 'ionicons';
import { ReservationService } from '../reservation.service';
import { LibConfigService } from '../granp-lib.module';
import { ChatService } from '../chat.service';

@Component({
    selector: 'app-info-reservation',
    templateUrl: './info-reservation.page.html',
    styleUrls: ['./info-reservation.page.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonBackButton,
        IonTitle,
        IonContent,
        IonList,
        IonRow,
        IonCol,
        IonLabel,
        IonText,
        IonItem,
        IonIcon,
        IonButton
    ]
})


export class InfoReservationPage implements OnInit {

    reservationService = inject(ReservationService);
    activatedRoute = inject(ActivatedRoute);
    libConfig = inject(LibConfigService);
    navCtrl = inject(NavController);
    loading = inject(LoadingController);
    chatService = inject(ChatService);

    reservationResponse?: ReservationResponse;

    constructor(private router: Router) {
        addIcons({ personOutline, medicalOutline, calendarOutline, timeOutline, ellipsisHorizontal, checkmarkOutline, closeOutline, trashOutline, chatboxOutline })
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.params['id'];

        this.reservationService.get(id).then(reservation => {
            this.reservationResponse = reservation;
        });
    }

    toLocaleDateString(date?: string) {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    }

    // To locale time string (hh:mm)
    toLocaleTimeString(date?: string) {
        if (!date) return '';
        return new Date(date).toLocaleTimeString().slice(0, 5);
    }


    checkStatus(): string {
        switch (this.reservationResponse?.status) {
            case ReservationStatus.Pending:
                return 'In attesa di conferma';
            case ReservationStatus.Accepted:
                return 'Prenotazione accettata';
            case ReservationStatus.Declined:
                return 'Prenotazione declinata';
            case ReservationStatus.Cancelled:
                return 'Prenotazione cancellata';
            default:
                return 'Stato prenotazione sconosciuto';
        }
    }

    checkStatusIcon(): string {
        switch (this.reservationResponse?.status) {
            case ReservationStatus.Pending:
                return 'ellipsis-horizontal';
            case ReservationStatus.Accepted:
                return 'checkmark-outline';
            case ReservationStatus.Declined:
                return 'close-outline';
            case ReservationStatus.Cancelled:
                return 'trash-outline';
            default:
                return 'ellipsis-horizontal';
        }
    }

    checkStatusIconColor(): string {
        switch (this.reservationResponse?.status) {
            case ReservationStatus.Pending:
                return 'warning';
            case ReservationStatus.Accepted:
                return 'success';
            case ReservationStatus.Declined:
                return 'danger';
            case ReservationStatus.Cancelled:
                return 'danger';
            default:
                return 'warning';
        }
    }

    showCancelButton(): boolean {
        // Only show the cancel button if the status is 'Pending' or 'Accepted'
        return (
            this.reservationResponse?.status === ReservationStatus.Pending ||
            this.reservationResponse?.status === ReservationStatus.Accepted
        );
    }

    cancelReservation() {
        if (!this.reservationResponse) return;

        this.reservationService.cancel(this.reservationResponse?.id).then(() => {
            console.log('Cancelled reservation');
        });
    }

    startChat() {
        if (this.libConfig.role == 'customer') {
            if (this.reservationResponse?.professional) {
                console.log("Creating chat with professional " + this.reservationResponse.professional.id);
                this.loading.create({
                    message: "Creazione chat in corso..."
                }).then((loading) => {
                    loading.present();
                    this.chatService.createChat(this.reservationResponse!.professional.id).then((chatId) => {
                        loading.dismiss();
                        this.navCtrl.navigateForward(['chat', chatId]);
                    });
                });
            } else {
                console.log("Professional not found");
            }
        } else if (this.libConfig.role == 'professional') {
            if (this.reservationResponse?.customer) {
                console.log("Creating chat with customer " + this.reservationResponse.customer.id);
                this.loading.create({
                    message: "Creazione chat in corso..."
                }).then((loading) => {
                    loading.present();
                    this.chatService.createChat(this.reservationResponse!.customer.id).then((chatId) => {
                        loading.dismiss();
                        this.navCtrl.navigateForward(['chat', chatId]);
                    });
                });
            } else {
                console.log("Customer not found");
            }
        }
    }

    acceptReservation() {
        if (!this.reservationResponse) return;

        this.reservationService.accept(this.reservationResponse?.id).then(() => {
            console.log('Accepted reservation');
        });
    }

    declineReservation() {
        if (!this.reservationResponse) return;

        this.reservationService.decline(this.reservationResponse?.id).then(() => {
            console.log('Rejected reservation');
        });
    }

    openCustomerDetails() {
        this.navCtrl.navigateForward(this.libConfig.profileRedirectPath, {
            queryParams: {
                id: this.reservationResponse?.customer.id
            }
        });
    }

    openProfessionalDetails() {
        this.navCtrl.navigateForward(this.libConfig.profileRedirectPath, {
            queryParams: {
                id: this.reservationResponse?.professional.id
            }
        });
    }

}