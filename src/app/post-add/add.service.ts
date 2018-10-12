import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { WINDOW } from '../window.service';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  private host;
  private fileHost;
  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
    this.host = 'http://' + window.location.hostname + ':4000/add';
    this.fileHost = 'http://' + window.location.hostname + ':4000/file';
  }

  createAdd (add) {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http.post<any>(`${this.host}/createAdd`, add)
      .subscribe(res => {
        if (res) {
        } else {
          return res;
        }
      }, err => {
        console.log(err);
        return false;
      });
  }
  getAdd (id) {
    console.log(id);
    this.http.get<any>(`${this.host}/one/` + id)
      .subscribe(res => {
        if (res) {
          return res;
        } else {
          console.log('Advertisement not found');
          return res;
        }
      }, err => {
        console.log(err);
        return false;
      });
  }
  getAllAdds() {
    return this.http.get<any>(`${this.host}/all`);
  }
}
