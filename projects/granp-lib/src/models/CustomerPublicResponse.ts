import { Address } from "./Address";
import { Gender } from "./Gender";

export interface CustomerPublicResponse {
    profilePicture: string;

    elderFirstName: string;
    elderLastName: string;
    gender?: Gender;
    elderAddress?: Address;
    elderBirthDate: string;
    elderAge: number;
    elderTelephoneNumber: string;
    elderDescription: string;

    firstName: string;
    lastName: string;
    phoneNumber: string;

    isElder: boolean; 
}