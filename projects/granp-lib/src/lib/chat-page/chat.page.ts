import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { Chat, ChatService } from '../chat.service';

import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gp-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonIcon, IonBackButton, IonButtons, IonList, IonItem, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPage {
    chatService = inject(ChatService);
    activatedRoute = inject(ActivatedRoute);
    cdRef = inject(ChangeDetectorRef);

    chat?: Chat;

    message = "";
    chatId: string;

    constructor() {
        addIcons({send});

        this.chatId = this.activatedRoute.snapshot.params['id'];

        // This will be a subscription to the chat service
        this.chatService.chats.subscribe(chats => {
            this.chat = chats.get(this.chatId);
            this.chatService.markChatAsRead(this.chatId);
            this.cdRef.markForCheck();
        });
    }

    ionViewWillEnter() {
        this.chatService.refreshChatMessages(this.chatId);
        this.chatService.markChatAsRead(this.chatId);
    }

    sendMessage() {
        if (this.message === "") {
            return;
        }

        this.chatService.sendMessage(this.chatId, this.message);
        this.message = "";
    }

    getMessageClass(index: number): string {
        if (!this.chat) {
            return '';
        }

        const message = this.chat.messages[index];
        const nextMessage = this.chat.messages[index + 1];

        var classList: string[] = [];

        if (nextMessage && nextMessage.sender === message.sender) {
            classList.push('consecutive-message');
        }
      
        if (message.sender === 'user') {
            classList.push('sent-message');
        } else {
            classList.push('received-message');
        }

        return classList.join(' ');
      }
}
