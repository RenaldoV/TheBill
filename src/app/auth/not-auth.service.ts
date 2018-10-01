import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotAuthService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/restaurant-dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
