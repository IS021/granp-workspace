import { Injectable, inject } from '@angular/core';
import { SearchFilter } from '../models';

import { LibConfigService } from './granp-lib.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    http = inject(HttpClient);
    config = inject(LibConfigService);

    private apiUrl = new URL('./search', this.config.apiServerUrl).href;

    search(filter: SearchFilter) {
        return new Promise<void>((resolve, reject) => {
            this.http.post<void>(this.apiUrl, filter).subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    professionalInfo(id: string) {
        return new Promise<void>((resolve, reject) => {
            this.http.get<void>(this.apiUrl + '/info', { params: { id: id } }).subscribe({
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
