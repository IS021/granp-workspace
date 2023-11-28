import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea } from '@ionic/angular/standalone';
// import { ChatService } from '../chat.service';

import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

@Component({
  selector: 'gp-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonIcon, IonBackButton, IonButtons, IonList, IonItem, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.css']
})
export class ChatPage {
    // chatService = inject(ChatService);

    messages: any[] = [
        {
            content: "Hello",
            sender: "user",
            time: new Date(10, 0, 0, 10, 0, 0),
        },
        {
            content: "Hi",
            sender: "other",
            time: new Date(10, 0, 0, 10, 1, 0),
        },
        {
            content: "How are you?",
            sender: "user",
            time: new Date(10, 0, 0, 10, 2, 0),
        },
        {
            content: "Fine",
            sender: "other",
            time: new Date(10, 0, 0, 10, 3, 0),
        },
        {
            content: "Thank you",
            sender: "other",
            time: new Date(10, 0, 0, 10, 4, 0),
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
            sender: "user",
            time: new Date(10, 0, 0, 10, 5, 0),
        }
    ];

    message = "";

    constructor() {
        addIcons({send});
    }

    sendMessage() {
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
