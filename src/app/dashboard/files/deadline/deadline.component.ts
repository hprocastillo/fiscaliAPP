import {Component, Input, OnInit} from '@angular/core';
import firebase from "firebase";
import User = firebase.User;
import {Alert} from "../../../interfaces/alert";
import {File} from "../../../interfaces/file";
import {AlertService} from "../../../services/alert.service";

@Component({
	selector: 'app-deadline',
	template: '<p style="background-color:{{showColor}};margin:0; padding:10px;color:#fff;font-weight:bold;">{{deadlineString}}</p>',
	styleUrls: ['./deadline.component.scss']
})
export class DeadlineComponent implements OnInit {
	@Input() file = {} as File;
	@Input() user = {} as User;
	alert = {} as Alert;
	today = new Date();
	pastDays: number | any;
	deadlineString = '';

	green = '#2ecc71';
	red = '#e74c3c';
	gray = '#7f8c8d';
	yellow = '#f1c40f';
	showColor: string = '';
	alertId = '';

	constructor(private alertSvc: AlertService) {
		const characters = 'AbCdEfGhIjKvWxYz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < charactersLength; i++) {
			this.alertId += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
	}

	ngOnInit(): void {

		const deadline: any = this.file.proceduralDeadline * 86400000;
		const openingDate: any = this.file.openingDate.toDate();
		const today: any = this.today;
		const limit = (openingDate.getTime() + deadline);
		const limitDate = new Date(limit);

		if (today > openingDate) {
			this.alert.id = this.alertId;
			this.alert.userId = this.user.uid;
			this.alert.userDisplayName = this.user.displayName;
			this.alert.userEmail = this.user.email;
			this.alert.userPhotoURL = this.user.photoURL;
			this.alert.fileNumber = this.file.fileNumber;
			this.alert.fileUrl = this.file.fileUrl;
			this.alert.openingDate = this.file.openingDate;
			this.alert.proceduralDeadline = this.file.proceduralDeadline;
			this.alert.createdAt = today;

			if (today > limitDate) {
				const diffYear = today.getFullYear() - limitDate.getFullYear();
				const diffMonth = (today.getMonth() + 1) - (limitDate.getMonth() + 1);
				const diffDay = ((diffYear * 365) + (diffMonth * 30) + (today.getDate() - limitDate.getDate()));
				this.deadlineString = diffDay + this.file.proceduralDeadline + '/ ' + this.file.proceduralDeadline + ' dias';
				this.showColor = this.red;
			} else {
				const leftYear = (limitDate.getFullYear() - today.getFullYear());
				const leftMonth = (limitDate.getMonth() + 1) - (today.getMonth() + 1);
				const leftDays = ((leftYear * 365) + (leftMonth * 30) + (limitDate.getDate() - today.getDate()));
				const currentDays = this.file.proceduralDeadline - leftDays;
				if (leftDays <= 5) {
					this.deadlineString = currentDays + '/ ' + this.file.proceduralDeadline + ' dias';
					this.showColor = this.yellow;
				} else {
					this.deadlineString = currentDays + '/ ' + this.file.proceduralDeadline + ' dias';
					this.showColor = this.green;
				}
			}

		} else {
			this.deadlineString = 'En espera...';
			this.showColor = this.gray;
		}
	}

	sendAlerts(leftDays: number) {
		let result: any;
		this.alertSvc.getAlert(this.user.uid, this.file.fileNumber, leftDays).subscribe(
				res => {
					result = res;
					if (result.length === 0) {
						this.alertSvc.saveAlert(this.alert, this.alertId)
						.then(res => res)
						.catch(err => console.log(err));
					}
				}, err => console.log(err));
	}

}
