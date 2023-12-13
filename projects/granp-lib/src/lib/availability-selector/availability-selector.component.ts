import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Availability } from '../../models/Availability';
import { Place } from '../../models/Place';
import { FormsModule } from '@angular/forms';
import { TimeTableRequest } from '../../models/TimeTableRequest';
import { TimeSlotRequest } from '../../models/TimeSlotRequest';

import {
  IonList,
  IonItem,
  IonLabel,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCard,
  IonText,
  IonIcon,
  IonCardContent,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'gp-availability-selector',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonCard,
    IonText,
    IonIcon,
    IonCardContent,
  ],
  templateUrl: './availability-selector.component.html',
  styleUrls: ['./availability-selector.component.css'],
})
export class AvailabilitySelectorComponent {
  // timeSlots: TimeSlotRequest[] = []
  newAvailability: Availability = new Availability(
    '08:00',
    '09:00',
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    Place.Both
  );

  availabilities: Availability[] = [];

  @Input() editable: boolean = true;

  @Input() timeSlots: TimeSlotRequest[] = [];
  @Output() timeSlotsChange: EventEmitter<TimeSlotRequest[]> = new EventEmitter<
    TimeSlotRequest[]
  >();


  convertTimeSlotsToAvailabilities() {
    this.availabilities = [];
    const availabilityDict: { [key: string]: Availability } = {};

    this.timeSlots.forEach((slot: TimeSlotRequest) => {
      const key = `${slot.startTime}-${slot.endTime}`;
      if (!availabilityDict[key]) {
        availabilityDict[key] = new Availability(
          slot.startTime,
          slot.endTime,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          Place.Both
        );
      }

      const availability = availabilityDict[key];

      switch (slot.weekDay) {
        case 0:
          availability.Sunday = true;
          break;
        case 1:
          availability.Monday = true;
          break;
        case 2:
          availability.Tuesday = true;
          break;
        case 3:
          availability.Wednesday = true;
          break;
        case 4:
          availability.Thursday = true;
          break;
        case 5:
          availability.Friday = true;
          break;
        case 6:
          availability.Saturday = true;
          break;
      }
    });

    // Convert the dictionary values back to an array
    this.availabilities = Object.values(availabilityDict);
  }

  
  setStartHour(event: any) {
    this.newAvailability.StartHour = event.detail.value;
  }

  
  setEndHour(event: any) {
    this.newAvailability.EndHour = event.detail.value;

  }

  /* Availability management */
  addNewAvailability() {
    if (
      (this.newAvailability.Monday ||
        this.newAvailability.Tuesday ||
        this.newAvailability.Wednesday ||
        this.newAvailability.Thursday ||
        this.newAvailability.Friday ||
        this.newAvailability.Saturday ||
        this.newAvailability.Sunday) &&
      this.newAvailability.StartHour < this.newAvailability.EndHour
    ) {
      const availability = this.newAvailability;
      this.availabilities.push(availability);

      //Manage timeslots addition
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      for (let i=0; i<days.length; i++) {
        if (availability[days[i]]) {
          const startHourFormatted : string = availability.StartHour.split(':')[0] + ':' + availability.StartHour.split(':')[1] + ':00';
          const endHourFormatted : string = availability.EndHour.split(':')[0] + ':' + availability.EndHour.split(':')[1] + ':00';
         
          this.timeSlots.push({
            startTime: startHourFormatted,
            endTime: endHourFormatted,
            weekDay: i,
            isAvailable: true
          }
        );
      }
    };

      this.newAvailability = new Availability(
        '08:00',
        '09:00',
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        Place.Both
      );
    }

    this.timeSlotsChange.emit(this.timeSlots);
  }

  removeAvailability(availability: Availability) {
    const index = this.availabilities.indexOf(availability);
    this.availabilities.splice(index, 1);

    //Manage timeslots removal
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 0; i< days.length; i++) {
      if (availability[days[i]]) {
        this.timeSlots.splice(
          this.timeSlots.findIndex(
            (slot: TimeSlotRequest) =>
              slot.startTime === availability.StartHour &&
              slot.endTime === availability.EndHour &&
              slot.weekDay === i &&
              slot.isAvailable === true
          ),
          1
        );
      }
    }

    this.timeSlotsChange.emit(this.timeSlots);
  }

  checkPlace(place: Place) {
    switch (place) {
      case Place.Both:
        return 'Studio/Domicilio';
      case Place.Domicile:
        return 'Domicilio';
      case Place.Office:
        return 'Studio';
    }
  }

  constructor() {
    addIcons({ trashOutline });
  }

  ngOnInit(): void {
    this.convertTimeSlotsToAvailabilities();
  }
}
