import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginButtonComponent } from './login-button/login-button.component';
import { LogoutButtonComponent, SignupButtonComponent } from '../public-api';

export interface GranpLibConfig {
    apiServerUrl: string;
    logoutRedirectUri: string;
}

export const LibConfigService = new InjectionToken<GranpLibConfig>('LibConfig');

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        IonicModule,
        LoginButtonComponent,
        LogoutButtonComponent,
        SignupButtonComponent
    ],
    exports: []
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