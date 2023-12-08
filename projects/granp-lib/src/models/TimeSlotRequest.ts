import { WeekDay } from "@angular/common";

export class TimeSlotRequest {
    weekDay: WeekDay;

    startTime: string;
    endTime: string;

    isAvailable: boolean;

    constructor() {
        this.weekDay = WeekDay.Monday;
        this.startTime = '';
        this.endTime = '';
        this.isAvailable = false;
    }
}