import { Component } from '@angular/core';
import {AuthGuardService} from "./auth/auth-guard.service";
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TheBill';
  constructor(private auth: AuthService) {}
  isAdmin() {
    return this.auth.isAuthenticated();
  }
}
