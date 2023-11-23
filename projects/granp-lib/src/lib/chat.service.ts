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
