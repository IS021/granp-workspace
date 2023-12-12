import { Address } from './Address';
import { Gender } from './Gender'
import { Profession } from './Profession';
import { TimeTableResponse } from './TimeTableResponse';

export interface ProfessionalProfileResponse {
    id: string;

    firstName: string;
    lastName: string;
    gender?: Gender;
    email: string;
    phoneNumber: string;
    profilePicture: string;

    description: string;
    profession : Profession;
    address?: Address;
    birthDate: string;
    idCardNumber: string;
    isVerified: boolean; 

    hourlyRate: number;
    maxDistance: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

    timeTable?: TimeTableResponse[];
}