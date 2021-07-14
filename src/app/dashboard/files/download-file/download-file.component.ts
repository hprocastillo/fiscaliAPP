import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
	selector: 'app-download-file',
	templateUrl: './download-file.component.html',
	styleUrls: ['./download-file.component.scss']
})
export class DownloadFileComponent implements OnInit {
	@Input() downloadUrl: string | any;
	linkDownload: Observable<string> | any;

	constructor(private storage: AngularFireStorage) {
	}

	ngOnInit(): void {
		if (this.downloadUrl) {
			const ref = this.storage.ref('files/' + this.downloadUrl);
			this.linkDownload = ref.getDownloadURL();
		}
	}

}
