import { Profession } from "./Profession";

export interface ProfessionalPreviewResponse {
    id: string;
    profilePicture: string;
    firstName: string;
    lastName: string;
    age: number;

    description: string;

    profession: Profession;
    isVerified: boolean;

    hourlyRate: number;
    longTimeJob: boolean;
    shortTimeJob: boolean;

}

