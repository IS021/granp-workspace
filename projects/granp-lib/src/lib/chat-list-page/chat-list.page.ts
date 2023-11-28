import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronForward } from 'ionicons/icons';
import { IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonTitle, IonToolbar } from '@ionic/angular/standalone';


@Component({
    selector: 'gp-chat-list-page',
    standalone: true,
    templateUrl: './chat-list.page.html',
    styleUrls: ['./chat-list.page.css'],
    imports: [NgFor, NgIf, IonHeader, IonTitle, IonToolbar, IonContent, IonList, IonItem, IonAvatar, IonNote, IonLabel]
})
export class ChatListPage {

    chats = [
        {
            id: 1,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
            name: 'Finn',
            lastMessage: {
                text: 'Hey, it\'s me',
                time: '9:38 pm'
            },
            unreadMessages: 2
        },
        {
            id: 2,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-han.png',
            name: 'Han',
            lastMessage: {
                text: 'I shot first',
                time: '10:15 am'
            },
            unreadMessages: 1
        },
        {
            id: 3,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-leia.png',
            name: 'Leia',
            lastMessage: {
                text: 'I know',
                time: '11:43 pm'
            },
            unreadMessages: 10
        },
        {
            id: 4,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
            name: 'Luke',
            lastMessage: {
                // Longer example of text that wraps.
                text: 'I\'m a Jedi, like my father before me. The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
                time: '8:30 am'
            },
            unreadMessages: 23
        },
        {
            id: 5,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-poe.png',
            name: 'Poe',
            lastMessage: {
                text: 'New ride?',
                time: 'Yesterday'
            },
            unreadMessages: 0
        },
        {
            id: 6,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-rey.png',
            name: 'Rey',
            lastMessage: {
                text: 'I\'m no one',
                time: 'Sunday'
            },
            unreadMessages: 0
        }
    ];

    constructor() {
        addIcons({chevronForward})
    }

    openChat(chatId: number) {
        console.log('openChat', chatId);
    }

}
