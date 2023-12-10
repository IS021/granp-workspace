import { Gender } from "./Gender";
import { Profession } from "./Profession";
import { TimeSlotRequest } from "./TimeSlotRequest";

export class SearchFilter {
    profession?: Profession;
    timeSlots?: TimeSlotRequest[];
    maxHourlyRate?: number;
    genders?: Gender[];
    longTimeJob?: boolean;
    shortTimeJob?: boolean;
    minRating?: number;
    minAge?: number;
    maxAge?: number;
}