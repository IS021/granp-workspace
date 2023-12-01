import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { LibConfigService } from '../granp-lib.module';

@Component({
    selector: 'gp-login-button',
    standalone: true,
    imports: [CommonModule, IonButton],
    template: `
        <ion-button class="loginButton" (click)="handleLogin()" expand="block" fill="outline" size="large">Accedi</ion-button>
    `,
    styles: []
})
export class LoginButtonComponent {
    auth = inject(AuthService);
    config = inject(LibConfigService);

    handleLogin() {
        // If environment is production, use the default loginWithRedirect
        // Otherwise, use loginWithRedirect with a custom openUrl function

        if (this.config.logoutRedirectUri.includes('localhost')) {
            this.auth.loginWithRedirect();
            return;
        }
                    
        this.auth
            .loginWithRedirect({
                authorizationParams: {
                    prompt: 'login',
                },
                openUrl: (url) => Browser.open({ url, windowName: '_self' })
            }).subscribe();
    }

}
