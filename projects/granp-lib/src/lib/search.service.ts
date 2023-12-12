import { Injectable, inject } from '@angular/core';
import { CustomerPublicResponse, ProfessionalPreviewResponse, ProfessionalPublicResponse, SearchFilter } from '../models';

import { LibConfigService } from './granp-lib.module';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    http = inject(HttpClient);
    config = inject(LibConfigService);

    private apiUrl = new URL('./search', this.config.apiServerUrl).href;

    searchCache: { [key: string]: ProfessionalPreviewResponse[] } = {};
    professionalCache: { [key: string]: ProfessionalPublicResponse } = {};
    customerCache: { [key: string]: CustomerPublicResponse } = {};

    search(filter: SearchFilter): Promise<ProfessionalPreviewResponse[]> {
        const cacheKey = JSON.stringify(filter);
        if (this.searchCache[cacheKey]) {
            return new Promise<ProfessionalPreviewResponse[]>((resolve, reject) => {
                resolve(this.searchCache[cacheKey]);
            });
        } else {
            return new Promise<ProfessionalPreviewResponse[]>((resolve, reject) => {
                this.http.post<ProfessionalPreviewResponse[]>(this.apiUrl, filter).subscribe({
                    next: (result) => {
                        this.searchCache[cacheKey] = result;
                        resolve(result);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            });
        }
    }

    clearCache() {
        this.searchCache = {};
        this.professionalCache = {};
        this.customerCache = {};
    }

    professionalInfo(id: string): Promise<ProfessionalPublicResponse> {
        if (this.professionalCache[id]) {
            return new Promise<ProfessionalPublicResponse>((resolve, reject) => {
                resolve(this.professionalCache[id]);
            });
        } else {
            return new Promise<ProfessionalPublicResponse>((resolve, reject) => {
                this.http.get<ProfessionalPublicResponse>(this.apiUrl + '/professional/' + id).subscribe({
                    next: (result) => {
                        this.professionalCache[id] = result;
                        resolve(result);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            });
        }
    }

    customerInfo(id: string): Promise<CustomerPublicResponse> {
        if (this.customerCache[id]) {
            return new Promise<CustomerPublicResponse>((resolve, reject) => {
                resolve(this.customerCache[id]);
            });
        } else {
            return new Promise<CustomerPublicResponse>((resolve, reject) => {
                this.http.get<CustomerPublicResponse>(this.apiUrl + '/customer/' + id).subscribe({
                    next: (result) => {
                        this.customerCache[id] = result;
                        resolve(result);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            });
        }
    }

}
