import { ProfessionalPublicResponse } from "./ProfessionalPublicResponse"; 
import { CustomerPublicResponse } from "./CustomerPublicResponse";
import { ReservationStatus } from "./ReservationStatus";

export interface ReservationPublicResponse {
    id: string;
    start: string;
    end: string;
    status: ReservationStatus;
}