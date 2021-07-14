import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
	public user$: Observable<any> = this.authSvc.afAuth.user;
	list = true;
	form = false;
	fileExcelName = 'listado-expedientes.xlsx';
	showType = '0';
	searchText: string | any;

	constructor(private authSvc: AuthService) {
	}

	ngOnInit(): void {
	}

	showForm() {
		this.list = false;
		this.form = true;
	}

	showList() {
		this.list = true;
		this.form = false;
	}

	exportList(): void {
		/* pass here the table id */
		let element = document.getElementById('fileTable');
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Hoja 1');

		/* save to file */
		XLSX.writeFile(wb, this.fileExcelName);
	}

	selectFile(event: any) {
		this.showType = event.value;
	}
}
