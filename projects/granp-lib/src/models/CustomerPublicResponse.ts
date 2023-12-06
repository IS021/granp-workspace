import { Address } from "./Address";
import { Gender } from "./Gender";

export interface CustomerPublicResponse {
    profilePicture: string;

    elderFirstName: string;
    elderLastName: string;
    elderAddress: string;
    elderBirthDate: string;
    elderAge: number;
    elderGender: Gender;
    elderTelephoneNumber: string;
    elderDescription: string;

    firstName: string;
    lastName: string;
    phoneNumber: string;

    isElder: boolean; 
}