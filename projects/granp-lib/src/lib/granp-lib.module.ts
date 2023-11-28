import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatService } from './chat.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

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
        HttpClientModule
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
                },
                {
                    provide: ChatService
                },
                {
                    provide: HttpClient
                },
            ]
        }
    }
}