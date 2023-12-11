import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Availability } from '../../models/Availability';
import { Place } from '../../models/Place';
import { FormsModule } from '@angular/forms';
import { TimeTableRequest } from '../../models/TimeTableRequest';
import { TimeSlotRequest } from '../../models/TimeSlotRequest';

import { IonList, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonCheckbox, IonSelect, IonSelectOption, IonButton, IonCard, IonText, IonIcon, IonCardContent} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { th } from 'date-fns/locale';

@Component({
  selector: 'gp-availability-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonCheckbox, IonSelect, IonSelectOption, IonButton, IonCard, IonText, IonIcon, IonCardContent],
  templateUrl: './availability-selector.component.html',
  styleUrls: ['./availability-selector.component.css']
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

  @Input() timeSlots: TimeSlotRequest[] = [];
  @Output() timeSlotsChange: EventEmitter<TimeSlotRequest[]> = new EventEmitter<TimeSlotRequest[]>();

  convertTimeSlotToAvailability(timeSlot: TimeSlotRequest): Availability {
    const availability = new Availability(
      timeSlot.startTime,
      timeSlot.endTime,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      Place.Both
    );
    switch (timeSlot.weekDay) {
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
    return availability;
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
      if (availability.Monday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 1,
          isAvailable: true,
        });
      }
      if (availability.Tuesday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 1,
          isAvailable: true,
        });
      }
      if (availability.Wednesday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 3,
          isAvailable: true,
        });
      }
      if (availability.Thursday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 4,
          isAvailable: true,
        });
      }
      if (availability.Friday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 5,
          isAvailable: true,
        });
      }
      if (availability.Saturday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 6,
          isAvailable: true,
        });
      }
      if (availability.Sunday) {
        this.timeSlots.push({
          startTime: availability.StartHour,
          endTime: availability.EndHour,
          weekDay: 0,
          isAvailable: true,
        });
      }

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
    if (availability.Monday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 1 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Tuesday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 2 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Wednesday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 3 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Thursday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 4 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Friday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 5 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Saturday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 6 &&
            slot.isAvailable === true
        ),
        1
      );
    }
    if (availability.Sunday) {
      this.timeSlots.splice(
        this.timeSlots.findIndex(
          (slot: TimeSlotRequest) =>
            slot.startTime === availability.StartHour &&
            slot.endTime === availability.EndHour &&
            slot.weekDay === 0 &&
            slot.isAvailable === true
        ),
        1
      );
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

    for (const timeSlot of this.timeSlots) {
      this.availabilities.push(this.convertTimeSlotToAvailability(timeSlot));
    }
  }

}
