export class ReservationRequest {
    professionalId: string;
    start: Date;
    end: Date;

    constructor(professionalId: string, start: Date, end: Date) {
        this.professionalId = professionalId;
        this.start = start;
        this.end = end;
    }
}