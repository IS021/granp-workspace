import { ProfessionalPublicResponse } from "./ProfessionalPublicResponse"; 
import { CustomerPublicResponse } from "./CustomerPublicResponse";
import { ReservationStatus } from "./ReservationStatus";

export interface ReservationResponse {
    id: string;
    professional: ProfessionalPublicResponse;
    customer: CustomerPublicResponse;
    start: string;
    end: string;
    status: ReservationStatus;
}