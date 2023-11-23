import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from '../login-button/login-button.component';
import { SignupButtonComponent } from '../signup-button/signup-button.component';
import { IonContent, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'gp-login-page',
  standalone: true,
  imports: [CommonModule, LoginButtonComponent, SignupButtonComponent, IonContent, IonText],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css']
})
export class LoginPage {

}
