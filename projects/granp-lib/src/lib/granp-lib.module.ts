import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatService } from './chat.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { GeocodingService } from './geocoding.service';

export interface GranpLibConfig {
    apiServerUrl: string;
    logoutRedirectUri: string;
    role : string;
    mapboxAccessToken: string;
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
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthHttpInterceptor,
                    multi: true
                },
                {
                    provide: GeocodingService
                }
            ]
        }
    }
}