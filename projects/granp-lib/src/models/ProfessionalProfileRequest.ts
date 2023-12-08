import { Gender } from "./Gender";
import { Profession } from "./Profession";
import { Address } from "./Address";
import { Availability } from "./Availability";

export class ProfessionalProfileRequest {

    profilePicture: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    gender: Gender;
    email: string;
    phoneNumber: string;
    idCardNumber: string;

    description: string;

    profession: Profession;
    address: Address;
    certificate: string;
    isVerified: boolean;

    maxDistance: number;
    hourlyRate: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

    availabilities: Availability[] = [];

    constructor() {
        this.profilePicture = '';
        this.firstName = '';
        this.lastName = '';
        this.birthDate = '';
        this.age = 0;
        this.gender = Gender.Other;
        this.email = '';
        this.phoneNumber = '';
        this.idCardNumber = '';

        this.description = '';

        this.profession = Profession.Other;
        this.address = new Address();
        this.certificate = '';
        this.isVerified = false;

        this.maxDistance = 0;
        this.hourlyRate = 0;
        this.longTimeJob = false;
        this.shortTimeJob = false;

        this.availabilities = [];
    }

}

