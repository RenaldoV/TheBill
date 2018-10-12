import {Component, Inject, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AddService} from "../post-add/add.service";
import {WINDOW} from "../window.service";

@Component({
  selector: 'app-rest-dashboard',
  templateUrl: './rest-dashboard.component.html',
  styleUrls: ['./rest-dashboard.component.css']
})
export class RestDashboardComponent implements OnInit {
  adds;
  fileHost;
  constructor(
    private router: Router,
    private addService: AddService,
    @Inject(WINDOW) private window: Window
  ) {
    this.fileHost = 'http://' + window.location.hostname + ':4000/';
    this.addService.getAllAdds().subscribe(res => {
      if (res) {
        this.adds = res;
      } else {
        console.log('No adds found');
        return res;
      }
    }, err => {
      console.log(err);
      return false;
    });
  }
  ngOnInit() {
    // this.adds = this.addService.getAllAdds();
    console.log(this.adds);
  }
  newAdd() {
    this.router.navigate(['newAdd']);
  }
}
