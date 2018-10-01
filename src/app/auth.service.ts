import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Router} from "@angular/router";
import { WINDOW } from "./window.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host;
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(WINDOW) private window: Window
    ) {
    this.host = "http://" + window.location.hostname + ':4000/user';
  }

  addUser (user) {
    console.log(user);
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http.post<any>(`${this.host}/addUser`, user)
      .subscribe(res => {
        if (res) {
          // this.saveUser(res.user);
        }else {
          return res;
        }
      }, err => {
        console.log(err);
        return false;
      });
  }
  loginUser (user) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http.post<any>(`${this.host}/login`, user)
      .subscribe(res => {
        if(res){
          this.saveUser(user);
          this.router.navigate(['/restaurant-dashboard']);
        }else {
          alert('Email and password combination is incorrect.');
          return false;
        }
      }, err => {
        console.log(err);
        return false;
      });
  }
  saveUser(user) {
    localStorage.setItem('user', user);
  }
  isAuthenticated(): boolean {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  destroySession() {
    localStorage.clear();
  }
}
