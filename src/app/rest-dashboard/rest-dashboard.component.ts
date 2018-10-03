import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-rest-dashboard',
  templateUrl: './rest-dashboard.component.html',
  styleUrls: ['./rest-dashboard.component.css']
})
export class RestDashboardComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit() {
  }
  newAdd() {
    this.router.navigate(['newAdd']);
  }
}
