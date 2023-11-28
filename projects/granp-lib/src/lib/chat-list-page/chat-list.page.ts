import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';

import { ChatService } from '../chat.service';

@Component({
    selector: 'gp-chat-list-page',
    standalone: true,
    templateUrl: './chat-list.page.html',
    styleUrls: ['./chat-list.page.css'],
    imports: [NgFor, NgIf, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonAvatar, IonNote, IonLabel]
})
export class ChatListPage {
    chatService = inject(ChatService);
    navCtrl = inject(NavController);

    chats: any[] = [];

    constructor() {
        addIcons({chevronForward})

        // This will be a subscription to the chat service
        this.chats = this.chatService.getChatList()
    }

    openChat(id: number) {
        this.navCtrl.navigateForward(['chat', id]);
    }

}
