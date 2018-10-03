import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
  }
  logOut() {
    this.auth.destroySession();
    this.router.navigate(['']);
  }
  isActivated(link) {
    if (this.router.url === link) {
      return 'nav-item active';
    } else {
      return 'nav-item';
    }
  }
  newAdd() {
    this.router.navigate(['newAdd']);
  }

}
