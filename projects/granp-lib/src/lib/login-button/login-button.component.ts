import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'gp-login-button',
  standalone: true,
  imports: [CommonModule, IonButton],
  template: `
    <ion-button (click)="handleLogin()" color="default" expand="block" fill="clear">Login</ion-button>
  `,
  styles: []
})
export class LoginButtonComponent {

    constructor() { }

    handleLogin() {
        console.log('handleLogin');
    }

}
