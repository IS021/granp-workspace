import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LibConfigService } from './granp-lib.module';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { from } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ChatMessageRequest {
    connectionId: string | null;
    to: string;
    text: string;
    dateTime: Date;
}

export interface ChatMessageResponse {
    connectionId: string;
    from: string;
    to: string;
    text: string;
    dateTime: Date;
}

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    config = inject(LibConfigService);
    http = inject(HttpClient);

    public messages: ChatMessageResponse[] = [];

    private hubConnection: HubConnection;
    private connectionUrl = new URL('./chathub', this.config.apiServerUrl).href;
    private apiUrl = new URL('./chat', this.config.apiServerUrl).href;

    private testChats: any[] = [
        {
            id: 1,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-finn.png',
            name: 'Finn',
            messages: [
                {
                    content: 'Hey, it\'s me',
                    time: new Date(10, 0, 0, 10, 0, 0),
                    sender: 'other',
                    read: true
                },
                {
                    content: 'Did you get the ice cream?',
                    time: new Date(10, 0, 0, 10, 1, 0),
                    sender: 'user',
                    read: true
                },
                {
                    content: 'We need to find the map',
                    time: new Date(10, 0, 0, 10, 2, 0),
                    sender: 'other',
                    read: true
                },
                {
                    content: 'I found it!',
                    time: new Date(10, 0, 0, 10, 3, 0),
                    sender: 'user',
                    read: true
                },
                {
                    content: 'I\'m a Jedi, like my father before me. The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
                    time: new Date(10, 0, 0, 10, 4, 0),
                    sender: 'other',
                    read: false
                }
            ]
        },
        {
            id: 2,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-han.png',
            name: 'Han',
            messages: [
                {
                    content: 'I shot first',
                    time: new Date(10, 0, 0, 10, 0, 0),
                    sender: 'user',
                    read: true
                },
                {
                    content: 'I know',
                    time: new Date(10, 0, 0, 10, 1, 0),
                    sender: 'other',
                    read: true
                },
                {
                    content: 'I\'m a Jedi, like my father before me. The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
                    time: new Date(10, 0, 0, 10, 2, 0),
                    sender: 'other',
                    read: false
                }
            ]
        },
        {
            id: 3,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-leia.png',
            name: 'Leia',
            messages: [
                {
                    content: 'I know',
                    time: new Date(10, 0, 0, 10, 0, 0),
                    sender: 'user',
                    read: true
                },
                {
                    content: 'I\'m a Jedi, like my father before me. The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
                    time: new Date(10, 0, 0, 10, 1, 0),
                    sender: 'other',
                    read: false
                }
            ]
        },
        {
            id: 4,
            image: 'https://ionicframework.com/docs/demos/api/list/avatar-luke.png',
            name: 'Luke',
            messages: [
                {
                    content: 'I\'m a Jedi, like my father before me. The Force runs strong in my family. My father has it. I have it. And... my sister has it. Yes. It\'s you, Leia.',
                    time: new Date(10, 0, 0, 10, 0, 0),
                    sender: 'user',
                    read: true
                },
                {
                    content: 'I know',
                    time: new Date(10, 0, 0, 10, 1, 0),
                    sender: 'other',
                    read: true
                },
                {
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
                    time: new Date(10, 0, 0, 10, 2, 0),
                    sender: 'other',
                    read: false
                }
            ]
        }
    ];

    public getChatList() {
        // TODO: Get chat list from API

        // Get chat list from test data in this form
        /*
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
        */

        return this.testChats.map((chat) => {
            return {
                id: chat.id,
                image: chat.image,
                name: chat.name,
                lastMessage: chat.messages[chat.messages.length - 1],
                unreadMessages: chat.messages.filter((message: any) => !message.read).length
            };
        });
    }

    public getChat(id: number) {
        return this.testChats.find((chat) => chat.id == id).messages;
    }

    public getUserInfo(id: number) {
        const chat = this.testChats.find((chat) => chat.id == id);
        return {
            name: chat.name,
            image: chat.image
        };
    }


    constructor() {
        this.hubConnection = this.getConnection();
    }

    public connect() {
        this.startConnection();
        this.addListeners();
    }

    public sendMessage(message: string, to: string) {
        return this.http.post(this.apiUrl, this.buildChatMessage(message, to))
            .pipe(tap(_ => console.log("Message sucessfully sent to api controller")));
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(this.connectionUrl)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Trace)
            .build();
    }

    private buildChatMessage(message: string, to: string): ChatMessageRequest {
        return {
            connectionId: this.hubConnection.connectionId,
            to: to,
            text: message,
            dateTime: new Date()
        };
    }

    private startConnection() {
        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch((err) => console.log('Error while establishing signalr connection: ' + err))
    }

    private addListeners() {
        this.hubConnection.on('ReceiveMessage', (message: ChatMessageResponse) => {
            this.messages.push(message);
            console.log('Message received from ' + message.from + ": " + message.text);
        });
    }
}
