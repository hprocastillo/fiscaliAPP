import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	constructor(public authSvc: AuthService, private router: Router) {
	}
	ngOnInit(): void {
	}
	async logout() {
		try {
			await this.authSvc.logout();
			await this.router.navigate(['/login']);
			console.log('estas deslogeado');
		} catch (error) {
			console.log(error);
		}
	}
}
