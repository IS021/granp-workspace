import { Address } from "./Address";
import { Gender } from "./Gender";

export interface CustomerPublicResponse {
    id: string;
    profilePicture: string;

    elderFirstName: string;
    elderLastName: string;
    gender?: Gender;
    elderAddress?: Address;
    elderAge: number;
    elderPhoneNumber: string;
    elderDescription: string;

    firstName: string;
    lastName: string;
    phoneNumber: string;

    isElder: boolean; 
}