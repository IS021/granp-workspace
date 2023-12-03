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
        return lastValueFrom(this.http.post<void>(new URL('./complete', this.profileUrl).href, profile));
    }
}
