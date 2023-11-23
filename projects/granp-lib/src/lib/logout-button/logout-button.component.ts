import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from '@auth0/auth0-angular';
import { Browser } from '@capacitor/browser';
import { LibConfigService } from '../granp-lib.module';

@Component({
    selector: 'gp-logout-button',
    standalone: true,
    imports: [CommonModule, IonButton],
    template: `
        <ion-button (click)="handleLogout()" color="default" expand="block" fill="clear">Esci</ion-button>
    `,
    styles: []
})
export class LogoutButtonComponent {
    auth = inject(AuthService);
    config = inject(LibConfigService);

    handleLogout(): void {
        this.auth
            .logout({
                logoutParams: {
                    returnTo: this.config.logoutRedirectUri // Dynamically take the redirect_uri from application config
                },
                openUrl: (url) => Browser.open({ url })
            })
            .subscribe();
    }

}
