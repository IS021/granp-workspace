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
            this.http.delete<void>(this.apiUrl + '/cancel', { params: { id: id } }).subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    getAll(): Promise<ReservationResponse[]> {
        return new Promise<ReservationResponse[]>((resolve, reject) => {
            this.http.get<ReservationResponse[]>(this.apiUrl + '/get-all').subscribe({
                next: (reservations) => {
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
            this.http.post<void>(this.apiUrl + '/accept', null, { params: { id: id } }).subscribe({
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
            this.http.post<void>(this.apiUrl + '/reject', null, { params: { id: id } }).subscribe({
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
