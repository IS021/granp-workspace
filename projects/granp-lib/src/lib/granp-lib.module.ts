import { NgModule } from '@angular/core';
import { GranpLibComponent } from './granp-lib.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SignupButtonComponent } from './signup-button/signup-button.component';
import { LogoutButtonComponent } from './logout-button/logout-button.component';



@NgModule({
  declarations: [
    GranpLibComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent
  ],
  imports: [
  ],
  exports: [
    GranpLibComponent,
    LoginButtonComponent,
    SignupButtonComponent,
    LogoutButtonComponent
  ]
})
export class GranpLibModule { }
