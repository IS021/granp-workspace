import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';

@Component({
    selector: 'gp-signup-button',
    standalone: true,
    imports: [CommonModule, IonButton],
    template: `
        <ion-button (click)="handleSignUp()" expand="block" fill="solid" size="large">Registrati</ion-button>
    `,
    styles: []
})
export class SignupButtonComponent {
    auth = inject(AuthService);

    handleSignUp(): void {

        if (window.location.hostname === "localhost") {
            this.auth.loginWithRedirect({
                    authorizationParams: {
                        prompt: 'login',
                        screen_hint: 'signup'
            }});
            return;
        }

        this.auth
            .loginWithRedirect({
                authorizationParams: {
                    prompt: 'login',
                    screen_hint: 'signup'
                },
                openUrl: (url) => Browser.open({ url, windowName: '_self' })
            }).subscribe();
    }

}
