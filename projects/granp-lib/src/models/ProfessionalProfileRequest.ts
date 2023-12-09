import { Gender } from "./Gender";
import { Profession } from "./Profession";
import { Address } from "./Address";
import { Availability } from "./Availability";

export class ProfessionalProfileRequest {

    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    profilePicture: string;
    description: string;
    profession: Profession;
    address: Address;
    birthDate: string;
    idCardNumber: string;
    hourlyRate?: number;
    maxDistance?: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.phoneNumber = '';
        this.profilePicture = '';
        this.description = '';
        this.profession = Profession.Other;
        this.address = new Address();
        this.birthDate = '';
        this.idCardNumber = '';
        this.longTimeJob = false;
        this.shortTimeJob = false;
    }

}

