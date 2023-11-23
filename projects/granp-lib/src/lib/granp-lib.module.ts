import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { ChatPage } from './chat-page/chat.page';
import { LoginPage } from './login-page/login.page';

export interface GranpLibConfig {
    apiServerUrl: string;
    logoutRedirectUri: string;
}

export const LibConfigService = new InjectionToken<GranpLibConfig>('LibConfig');

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginButtonComponent,
        LogoutButtonComponent,
        SignupButtonComponent,
        ChatPage,
        LoginPage
    ],
    exports: [],
    declarations: []

})

export class GranpLibModule {
    static forRoot(config: GranpLibConfig): ModuleWithProviders<GranpLibModule> {
        return {
            ngModule: GranpLibModule,
            providers: [
                {
                    provide: LibConfigService,
                    useValue: config
                }
            ]
        }
    }
}