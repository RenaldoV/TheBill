import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-add',
  templateUrl: './new-add.component.html',
  styleUrls: ['./new-add.component.css']
})
export class NewAddComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  postAdd(option) {
    this.router.navigate(['/postAdd', option]);
  }

}
