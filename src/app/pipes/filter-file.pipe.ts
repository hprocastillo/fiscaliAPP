import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'filterFile'
})
export class FilterFilePipe implements PipeTransform {
	transform(items: Array<any>, searchText: string): any {
		const data = searchText.toLowerCase();
		return items.filter(item =>
				item.fileNumber.toLowerCase() === data ||
				item.accused.toLowerCase() === data ||
				item.aggrieved.toLowerCase() === data ||
				item.prosecutor.toLowerCase() === data ||

				item.fileNumber.toLowerCase().includes(data) ||
				item.accused.toLowerCase().includes(data) ||
				item.aggrieved.toLowerCase().includes(data) ||
				item.prosecutor.toLowerCase().includes(data));
	}

}
