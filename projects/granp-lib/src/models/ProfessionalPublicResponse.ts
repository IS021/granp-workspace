import { Address } from "./Address";
import { Gender } from "./Gender";
import { Profession } from "./Profession";

export interface ProfessionalPublicResponse {
    id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    gender?: Gender;
    email: string;
    phoneNumber: string;

    description: string;

    profession: Profession;
    address?: Address;
    isVerified: boolean;

    hourlyRate: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

}

