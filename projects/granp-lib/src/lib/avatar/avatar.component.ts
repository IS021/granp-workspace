import { Component, Input, Output, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar, IonIcon, ToastController } from '@ionic/angular/standalone';
import { checkmarkDoneCircle, alertCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'gp-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, IonAvatar, IonIcon],
})
export class AvatarComponent {
    @Input() profilePicture?: string;
    @Input() verified?: boolean;

    @Input() height: string = '100%';
    @Input() width: string = '100%';

    @Input() styleClass: string = '';

    @Input() iconRatio: string = '20%';

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
