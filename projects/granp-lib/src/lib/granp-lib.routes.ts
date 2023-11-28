import { Routes } from '@angular/router';
import { ChatPage } from './chat-page/chat.page';

export const granpRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login-page/login.page').then((m) => m.LoginPage),
    },
    {
        path: 'chat/:id',
        loadComponent: () => import('./chat-page/chat.page').then((m) => m.ChatPage),
    },
];
