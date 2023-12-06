import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonDatetime, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'gp-calendar.page',
  standalone: true,
  imports: [CommonModule, IonHeader, IonTitle, IonToolbar, IonContent, IonDatetime],
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.css']
})
export class CalendarPage {

}
