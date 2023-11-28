import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea } from '@ionic/angular/standalone';
import { ChatService } from '../chat.service';

import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gp-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonIcon, IonBackButton, IonButtons, IonList, IonItem, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css']
})
export class ChatPage {
    chatService = inject(ChatService);
    activatedRoute = inject(ActivatedRoute);

    messages: any[] = [];
    user: any = {};

    message = "";
    chatId: number;

    constructor() {
        addIcons({send});

        this.chatId = this.activatedRoute.snapshot.params['id'];
        console.log(this.chatId);

        // This will be a subscription to the chat service
        this.messages = this.chatService.getChat(this.chatId)
        this.user = this.chatService.getUserInfo(this.chatId);
    }

    sendMessage() {
        // This will be a call to the chat service
        this.messages.push({
            content: this.message,
            sender: "user",
            // Time down to the minute
            time: new Date()
        });
        this.message = "";
    }

    getMessageClass(index: number): string {
        const message = this.messages[index];
        const nextMessage = this.messages[index + 1];

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
