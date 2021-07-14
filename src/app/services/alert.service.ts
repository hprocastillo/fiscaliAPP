import {Injectable} from '@angular/core';
import {Alert} from "../interfaces/alert";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class AlertService {

	private alertsCollection: AngularFirestoreCollection<Alert>;

	constructor(private readonly afs: AngularFirestore) {
		this.alertsCollection = afs.collection<Alert>('alerts');
	}

	getAlert(userId: string, fileNumber: string, leftDays: number) {
		return this.afs.collection<Alert>('alerts', ref => ref
		.where('userId', '==', userId)
		.where('fileNumber', '==', fileNumber)
		.where('leftDays', '==', leftDays))
		.snapshotChanges().pipe(map(actions => actions.map(a => {
			const data = a.payload.doc.data() as Alert;
			const id = a.payload.doc.id;
			return {id, ...data};
		})));
	}

	saveAlert(alert: Alert, alertId: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				const id = alertId;
				const data = {id, ...alert};
				const result = await this.alertsCollection.doc(id).set(data);
				resolve(result);
			} catch (err) {
				reject(err.message);
			}
		});
	}
}
