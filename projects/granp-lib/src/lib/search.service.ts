import { Injectable, inject } from '@angular/core';
import { ProfessionalPublicResponse, SearchFilter } from '../models';

import { LibConfigService } from './granp-lib.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    http = inject(HttpClient);
    config = inject(LibConfigService);

    private apiUrl = new URL('./search', this.config.apiServerUrl).href;

    search(filter: SearchFilter): Promise<ProfessionalPublicResponse[]> {
        return new Promise<ProfessionalPublicResponse[]>((resolve, reject) => {
            this.http.post<ProfessionalPublicResponse[]>(this.apiUrl, filter).subscribe({
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    professionalInfo(id: string): Promise<ProfessionalPublicResponse> {
        return new Promise<ProfessionalPublicResponse>((resolve, reject) => {
            this.http.get<ProfessionalPublicResponse>(this.apiUrl + '/info', { params: { id: id } }).subscribe({
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
}
