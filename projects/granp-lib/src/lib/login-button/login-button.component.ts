import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';

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
    auth = inject(AuthService);

    handleLogin() {
        this.auth
        .loginWithRedirect({
            authorizationParams: {
                prompt: 'login',
            },
            openUrl: (url) => Browser.open({ url, windowName: '_self' })
        }).subscribe();
    }

}
