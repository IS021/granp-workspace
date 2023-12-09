import { Component, Input, Output, EventEmitter, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonButton, IonButtons, IonInput, IonItem, IonList, IonModal, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

import { Address } from '../../models';
import { GeocodingService } from '../geocoding.service';

@Component({
  selector: 'gp-address-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, IonItem, IonInput, IonModal, IonToolbar, IonButtons, IonButton, IonTitle, IonList],
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.css']
})
export class AddressSelectorComponent {

    @Input() address: Address = new Address();
    @Output() addressChange: EventEmitter<Address> = new EventEmitter<Address>();

    modalController = inject(ModalController);
    geocodingService = inject(GeocodingService);
    cdRef = inject(ChangeDetectorRef);
    alertController = inject(AlertController);

    addressString: string = '';

    submitElderAddress() {
        this.addressString = `${this.address.street} ${this.address.streetNumber}, ${this.address.city}, ${this.address.zipCode}`;
        this.handleAddress(this.addressString);

        // Dismiss the modal and pass addressString
        this.modalController.dismiss();
    }

    handleAddress(address: string) {
        console.log("Getting coordinates for address", address);

        this.geocodingService.getAddressLocation(address).subscribe((data: any) => {
            console.log("Got coordinates", data);

            if (data.features && data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                this.address.location!.latitude = coordinates[1];
                this.address.location!.longitude = coordinates[0];

                this.geocodingService.getReverseGeocodeLocation(
                        this.address.location!.latitude,
                        this.address.location!.longitude
                    ).subscribe((reverseData: any) => {

                        if (reverseData.features && reverseData.features.length > 0) {
                            
                            console.log(reverseData);
                            
                            const addressArray = reverseData.features[0];

                            //this.customer.elderAddress.ZipCode = addressArray.context[0].text;
                            //this.customer.elderAddress.City = addressArray.context[1].text;
                            //this.customer.elderAddress.StreetNumber = addressArray.address;
                            //this.customer.elderAddress.Street = addressArray.properties.text;

                            this.cdRef.markForCheck();
                            this.addressChange.emit(this.address);
                            console.log(this.address, addressArray);
                        }

                    });

            } else {

                this.alertController.create({
                    header: 'Errore',
                    message: 'Indirizzo non valido',
                    buttons: ['OK'],
                });

            }
        });
    }

}
