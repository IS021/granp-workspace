import { Injectable, inject } from '@angular/core';
import { LibConfigService } from './granp-lib.module';
import { HttpClient } from '@angular/common/http';

import { TimeTableRequest, TimeTableResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class TimetableService {
    config = inject(LibConfigService);
    http = inject(HttpClient);

    private apiUrl = new URL('./timetable', this.config.apiServerUrl).href;

    update(timetable: TimeTableRequest): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.http.put<void>(this.apiUrl + '/update', timetable).subscribe({
                next: () => {
                    resolve();
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    get(): Promise<TimeTableResponse> {
        return new Promise<TimeTableResponse>((resolve, reject) => {
            this.http.get<TimeTableResponse>(this.apiUrl + '/get').subscribe({
                next: (timetable) => {
                    resolve(timetable);
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }
    

}
