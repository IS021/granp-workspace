import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonTitle, IonToolbar, LoadingController, NavController } from '@ionic/angular/standalone';

import { ChatService, Chat } from '../chat.service';

@Component({
    selector: 'gp-chat-list-page',
    standalone: true,
    templateUrl: './chat-list.page.html',
    styleUrls: ['./chat-list.page.css'],
    imports: [NgFor, NgIf, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonAvatar, IonNote, IonLabel],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListPage {
    chatService = inject(ChatService);
    navCtrl = inject(NavController);
    cdRef = inject(ChangeDetectorRef);
    loadingCtrl = inject(LoadingController);

    loading?: HTMLIonLoadingElement;

    constructor() {
        addIcons({ chevronForward });

        this.chatService.chats.subscribe(chats => {
            console.log("Chat list updated", chats);
            this.cdRef.markForCheck();
        });
    }

    // Every time the page is entered, refresh the chat list
    ionViewWillEnter() {
        this.showLoading();

        this.chatService.refreshChatList().then(() => {
            this.loading?.dismiss();
            console.log("Chat list refreshed");
            this.cdRef.markForCheck();
        });
    }

    openChat(id: string) {
        this.navCtrl.navigateForward(['chat', id]);
    }

    async showLoading() {
        this.loading = await this.loadingCtrl.create({
            message: 'Carico Chat...'
        });

        this.loading.present();
    }

}
