import { TimeSlotRequest } from './TimeSlotRequest';

export class TimeTableRequest {
    weeksInAdvance: number;
    timeSlots: TimeSlotRequest[] = [];

    constructor() {
        this.weeksInAdvance = 0;
        this.timeSlots = [];
    }
}