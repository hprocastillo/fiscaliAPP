import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";
import {File} from "../interfaces/file";

@Injectable({
	providedIn: 'root'
})
export class FileService {

	files: Observable<File[]>;
	filesCollection: AngularFirestoreCollection<File>;

	constructor(private readonly afs: AngularFirestore) {
		this.filesCollection = afs.collection<File>('files', ref => ref.orderBy('openingDate', 'desc'));
		this.files = this.filesCollection.snapshotChanges().pipe(
				map(actions => actions.map(a => {
					const data = a.payload.doc.data() as File;
					const id = a.payload.doc.id;
					return {id, ...data};
				})));
	}

	saveFile(file: File, fileId: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			try {
				const id = fileId || this.afs.createId();
				const data = {id, ...file};
				const result = await this.filesCollection.doc(id).set(data);
				resolve(result);
			} catch (err) {
				reject(err.message);
			}
		});
	}

	getFiles(): any {
		return this.files;
	}
}
