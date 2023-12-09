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
        return lastValueFrom(this.http.get<boolean>(this.profileUrl + '/is-complete'));
    }

    public completeProfile(profile: any): Promise<void> {
        return lastValueFrom(this.http.post<void>(this.profileUrl + '/complete', profile));
    }

    public getProfile<T>(): Promise<any> {
        return lastValueFrom(this.http.get<T>(this.profileUrl + '/get'));
    }

    public updateProfile(profile: any): Promise<void> {
        return lastValueFrom(this.http.put<void>(this.profileUrl + '/update', profile));
    }
}
