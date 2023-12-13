import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LibConfigService } from './granp-lib.module';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    config = inject(LibConfigService);
    http = inject(HttpClient);

    profileUrl = new URL('./' + this.config.role, this.config.apiServerUrl).href;

    constructor() { }

    public isComplete(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.http.get<boolean>(this.profileUrl + '/is-complete').subscribe({
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    public completeProfile(profile: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.post<void>(this.profileUrl + '/complete', profile).subscribe({
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    public getProfile<T>(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(this.profileUrl + '/get').subscribe({
                next: (result) => {
                    resolve(result);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    public updateProfile(profile: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.put<void>(this.profileUrl + '/update', profile).subscribe({
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
