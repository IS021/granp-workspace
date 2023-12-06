import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar, IonIcon, ToastController } from '@ionic/angular/standalone';
import { checkmarkDoneCircle, alertCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
    selector: 'gp-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css'],
    standalone: true,
    imports: [CommonModule, IonAvatar, IonIcon],
})
export class AvatarComponent {
    @Input() profilePicture?: string;
    @Input() verified?: boolean;

    @Input() height: string = '100%';
    @Input() width: string = '100%';

    @Input() styleClass: string = '';

    toastController = inject(ToastController);

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'bottom',
        });
        toast.present();
    }

    constructor() {
        addIcons({checkmarkDoneCircle, alertCircle});
    }

}
