import { Injectable, inject } from '@angular/core';
import { ReservationRequest, ReservationResponse } from '../models';
import { HttpClient } from '@angular/common/http';

import { LibConfigService } from './granp-lib.module';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    http = inject(HttpClient);
    config = inject(LibConfigService);

    private apiUrl = new URL('./reservations', this.config.apiServerUrl).href;

    private reservationCache: ReservationResponse[] = [];

    request(reservationRequest: ReservationRequest): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.post<void>(this.apiUrl + '/request', reservationRequest).subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    cancel(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.delete<void>(this.apiUrl + '/cancel/' + id).subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    get(id: string): Promise<ReservationResponse> {
        // Check if the reservation is in the cache
        const cachedReservation = this.reservationCache.find(reservation => reservation.id === id);
        if (cachedReservation) return Promise.resolve(cachedReservation);

        // If not, get all reservations
        return this.getAll().then(reservations => {
            // Find the reservation in the list
            const reservation = reservations.find(reservation => reservation.id === id);
            if (!reservation) throw new Error('Reservation not found');
            return reservation;
        });
    }

    getAll(): Promise<ReservationResponse[]> {
        return new Promise<ReservationResponse[]>((resolve, reject) => {
            this.http.get<ReservationResponse[]>(this.apiUrl + '/get-all').subscribe({
                next: (reservations) => {
                    this.reservationCache = reservations;
                    resolve(reservations);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    accept(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.post<void>(this.apiUrl + '/accept/' + id, '').subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    reject(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.post<void>(this.apiUrl + '/reject/' + id, '').subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

}
