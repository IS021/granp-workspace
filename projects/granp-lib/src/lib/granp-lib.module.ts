import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginButtonComponent } from './login-button/login-button.component';

export interface GranpLibConfig {
    apiServerUrl: string;
    auth0Domain: string;
    auth0ClientId: string;
    auth0CallbackUrl: string;
    auth0Audience: string;
    auth0Scope: string;
}

export const LibConfigService = new InjectionToken<GranpLibConfig>('LibConfig');

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        IonicModule,
        LoginButtonComponent
    ],
    exports: []
})
export class GranpLibModule {
    static forRoot(config: GranpLibConfig) {
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
