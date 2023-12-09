import { TimeSlotResponse } from './TimeSlotResponse';

export class TimeTableResponse {
    weeksInAdvance: number;
    timeSlots: TimeSlotResponse[] = [];

    constructor() {
        this.weeksInAdvance = 0;
        this.timeSlots = [];
    }
}