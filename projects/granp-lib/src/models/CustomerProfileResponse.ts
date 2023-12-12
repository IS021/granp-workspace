import { Address } from "./Address";
import { Gender } from "./Gender";

export interface CustomerProfileResponse {
    id: string;
    isElder: boolean;
    firstName: string;
    lastName: string;
    gender?: Gender;
    email: string;
    phoneNumber: string;
    profilePicture: string;
    elderFirstName: string;
    elderLastName: string;
    elderAddress?: Address;
    elderBirthDate: string;
    elderPhoneNumber: string;
    elderDescription: string;  
}