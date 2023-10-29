import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LoginButtonComponent } from './login-button/login-button.component';

export interface GranpLibConfig {
    apiServerUrl: string;
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