import { GeoLocation } from './GeoLocation';

export class Address {
    // Properties
    street: string;
    streetNumber: string;
    city: string;
    zipCode: string;

    location: GeoLocation;

    // Constructor
    constructor() {
        this.street = '';
        this.streetNumber = '';
        this.city = '';
        this.zipCode = '';
        this.location = new GeoLocation(0,0);
    }

    getFullAddress(): any {
        if (this.streetNumber === '' || this.street === '' || this.city === '' || this.zipCode === '') {
            return null ;
        }
        return `${this.street} ${this.streetNumber}, ${this.city}, ${this.zipCode}`;
    }

    setFullAddress(fullAddress: string) {
        const addressArray = fullAddress.split(', ');
        this.street = addressArray[0];
        this.streetNumber = addressArray[1];
        this.city = addressArray[2];
        this.zipCode = addressArray[3];
    }
}
