import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, public authSvc: AuthService) {
  }

  ngOnInit(): void {
  }

  goFiles() {
    this.router.navigate(['dashboard/files']).then(r => console.log(r));
  }

  goCalendar() {
    this.router.navigate(['dashboard/calendar']).then(r => console.log(r));
  }
}
