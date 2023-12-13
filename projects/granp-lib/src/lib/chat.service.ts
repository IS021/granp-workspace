import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LibConfigService } from './granp-lib.module';
import { HubConnection, HubConnectionBuilder, IHttpConnectionOptions, LogLevel, HttpTransportType } from '@microsoft/signalr'
import { BehaviorSubject, Observable, from, lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

export interface SignalRMessage {
    id: string;
    chatId: string;
    content: string;
    time: Date;
}

export interface ChatMessageRequest {
    connectionId: string;
    chatId: string;
    content: string;
    time: Date;
}

export interface ChatMessageResponse {
    sender: string;
    content: string;
    read: boolean;
    time: Date;
}

export interface ChatInfoResponse {
    id: string;
    profileId: string;
    profilePicture: string;
    name: string;
    lastMessage: string;
    lastMessageId?: string;
    time: Date;
    unreadMessages: number;
}

export interface Chat extends ChatInfoResponse {
    messages: ChatMessageResponse[];
}

export type ChatDict = Map<string, Chat>;

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    config = inject(LibConfigService);
    http = inject(HttpClient);
    auth = inject(AuthService);

    private hubConnection: HubConnection;
    private connectionUrl = new URL('./chathub', this.config.apiServerUrl).href;
    private apiUrl = new URL('./chat', this.config.apiServerUrl).href;

    public chatDict: ChatDict = new Map();

    public chats: BehaviorSubject<ChatDict> = new BehaviorSubject<ChatDict>(this.chatDict);

    public refreshChatList(): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            this.http.get<ChatInfoResponse[]>(this.apiUrl + '/list').pipe(
                // Convert time to Date objects
                tap((chats: ChatInfoResponse[]) => {
                    chats.forEach(chat => {
                        chat.time = new Date(chat.time);
                    });
                })
            ).subscribe((chats: ChatInfoResponse[]) => {
                chats.forEach(chat => {
                    // Update chatDict leaving messages as they are
                    this.chatDict.set(chat.id, {
                        ...chat,
                        messages: this.chatDict.get(chat.id)?.messages || []
                    });
                });
                
                this.chats.next(this.chatDict);
                resolve();
            });

        });
    }

    public refreshChatMessages(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            this.http.get<ChatMessageResponse[]>(this.apiUrl + '/messages/' + id).pipe(
                // Convert time to Date objects
                tap((messages: ChatMessageResponse[]) => {
                    messages.forEach(message => {
                        message.time = new Date(message.time);
                    })
                })
            ).subscribe((messages: ChatMessageResponse[]) => {
                // Update chatDict leaving chat info as it is
                const chat = this.chatDict.get(id);
                if (chat) {
                    chat.messages = messages;
                    this.chatDict.set(id, chat);
                    this.chats.next(this.chatDict);
                    resolve();
                } else {
                    reject();
                }
            });

        });
    }

    public sendMessage(chatId: string, message: string) {
        this.http.post(this.apiUrl + "/send", this.buildChatMessage(chatId, message))
            .pipe(tap(_ => console.log("Message sucessfully sent to api controller")))
            .subscribe(() => {
                // Add message to chatDict
                const chat = this.chatDict.get(chatId);
                if (chat) {
                    chat.messages.push({
                        sender: 'user',
                        content: message,
                        read: true,
                        time: new Date()
                    });
                    
                    chat.lastMessage = message;
                    chat.time = new Date();

                    this.chatDict.set(chatId, chat);
                    this.chats.next(this.chatDict);
                } else {
                    this.refreshChat(chatId);
                }
            });
    }

    // Mark all messages in chat as read
    public markChatAsRead(chatId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            if (this.chatDict.get(chatId)?.unreadMessages === 0) {
                resolve();
                return;
            }

            this.http.post(this.apiUrl + '/read/' + chatId, {}).subscribe(() => {
                // Update chatDict leaving chat info as it is
                const chat = this.chatDict.get(chatId);
                if (chat) {
                    chat.messages.forEach(message => {
                        if(message.sender === 'other') {
                            message.read = true;
                        }
                    });

                    chat.unreadMessages = 0;

                    this.chatDict.set(chatId, chat);
                    this.chats.next(this.chatDict);
                    resolve();
                } else {
                    reject();
                }
            });

        });
    }

    createChat(professionalId: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
    
            // Create HttpParams object
            let params = new HttpParams().set('professionalId', professionalId);
    
            // Pass the params as the third argument of the post method
            this.http.post<string>(this.apiUrl + '/create', null, { params: params }).subscribe({
                next: (chatId) => {
                    this.refreshChat(chatId).then(() => {
                        resolve(chatId);
                    });
                },
                error: (error) => {
                    reject(error);
                }
            });
        });
    }

    private refreshChat(chatId: string): Promise<void> {
        // If chat doesn't exist, refresh chat list
        return this.refreshChatList().then(() => {
            // Then refresh chat messages
            this.refreshChatMessages(chatId).then(() => {
                this.chats.next(this.chatDict);
            });
        });
    }

    constructor() {
        this.hubConnection = this.getConnection();
    }

    public connect() {
        this.startConnection();
        this.addListeners();
    }

    public disconnect() {
        this.hubConnection.stop();
    }

    private getConnection(): HubConnection {
        return new HubConnectionBuilder()
            .withUrl(this.connectionUrl, {
                accessTokenFactory: () => lastValueFrom(this.auth.getAccessTokenSilently())
            } as IHttpConnectionOptions)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Trace)
            .build();
    }

    private buildChatMessage(chatId: string, message: string): ChatMessageRequest {
        return {
            connectionId: this.hubConnection.connectionId || '',
            chatId: chatId,
            content: message,
            time: new Date()
        };
    }

    private startConnection() {
        this.hubConnection.start()
            .then(() => console.log('Connection started'))
            .catch((err) => console.log('Error while establishing signalr connection: ' + err))
    }

    private addListeners() {
        this.hubConnection.on('ReceiveMessage', (message: SignalRMessage) => {
            console.log("Received message from signalr hub: " + message.content);
            // Add message to chatDict
            const chat = this.chatDict.get(message.chatId);
            if (chat) {
                if (message.id == chat.lastMessageId) {
                    console.log("Message already present in chat");
                    return;
                }
    
                chat.messages.push({
                    sender: 'other',
                    content: message.content,
                    read: false,
                    time: new Date(message.time)
                });

                chat.lastMessage = message.content;
                chat.time = new Date(message.time);

                chat.unreadMessages += 1;
                chat.lastMessageId = message.id;

                this.chatDict.set(message.chatId, chat);
                this.chats.next(this.chatDict);

                console.log("Chat updated", chat.id);
            } else {
                this.refreshChat(message.chatId);
            }
        });
    }
}
