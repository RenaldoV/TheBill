import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  saveUser(user) {
    localStorage.setItem('user', user);
    console.log(localStorage.getItem('user'));
  }
  isAuthenticated(): boolean {
    console.log(localStorage.getItem('user'));
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  destroySession() {
    localStorage.clear();
    // console.log(localStorage.getItem('user'));
  }
}
