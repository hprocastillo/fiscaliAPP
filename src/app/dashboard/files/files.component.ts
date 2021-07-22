import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import * as XLSX from 'xlsx';

@Component({
	selector: 'app-files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

	appList = false;
	appForm = true;
	fileExcelName = 'Expedientes.xlsx';
	showType = '0';
	searchText: string | any;

	constructor(public authSvc: AuthService) {
	}

	ngOnInit(): void {
	}

	showForm() {
		this.appList = false;
		this.appForm = true;
	}

	showList() {
		this.appList = true;
		this.appForm = false;
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
