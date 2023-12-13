import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonList, IonTitle, IonToolbar, IonButton, IonAvatar, IonNote, IonText, IonInput, IonTextarea, NavController } from '@ionic/angular/standalone';
import { Chat, ChatService } from '../chat.service';

import { addIcons } from 'ionicons';
import { send } from 'ionicons/icons';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LibConfigService } from '../granp-lib.module';



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
    navCtrl = inject(NavController);
    config = inject(LibConfigService);
    //keyboard = inject(Keybo)

    chat?: Chat;

    message = "";
    chatId: string;

    chatSubscription?: Subscription;

    @ViewChild(IonContent) content!: IonContent;

    constructor() {
        addIcons({send});

        this.chatId = this.activatedRoute.snapshot.params['id'];

        // This will be a subscription to the chat service
        this.chatService.chats.subscribe(chats => {
            this.chat = chats.get(this.chatId);
            this.cdRef.markForCheck();

            // Wait for the view to be updated, then scroll to bottom
            setTimeout(() => {
                this.scrollToBottom();
            }, 100);
        });
    }

    scrollToBottom() {
        // this.content.scrollToBottom(100);
    }

    ionViewWillEnter() {
        this.chatService.refreshChatMessages(this.chatId);
        this.chatService.markChatAsRead(this.chatId);
    }

    ionViewDidEnter() {
        this.scrollToBottom();

        this.chatSubscription = this.chatService.chats.subscribe(() => {
            this.chatService.markChatAsRead(this.chatId);
        });
    }

    ionViewWillLeave() {
        this.chatSubscription?.unsubscribe();
    }

    sendMessage(event: Event) {
        event.preventDefault();

        if (this.message == "" || this.message.trim() == "" || this.message == undefined) {
            return;
        }

        this.chatService.sendMessage(this.chatId, this.message);
        this.message = "";
    }

    profileClicked() {
        if(this.config.profileRedirectPath !== "") {
            this.navCtrl.navigateForward(this.config.profileRedirectPath, {
                queryParams: {
                    id: this.chat?.profileId
                }
            });
        }
    }

    getMessageClass(index: number): string {
        if (!this.chat) {
            return '';
        }

        const message = this.chat.messages[index];
        const previousMessage = this.chat.messages[index - 1];

        var classList: string[] = [];

        if (previousMessage && previousMessage.sender === message.sender) {
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
