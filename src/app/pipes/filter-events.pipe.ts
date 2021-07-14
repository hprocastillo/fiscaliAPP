import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'filterEvents'
})
export class FilterEventsPipe implements PipeTransform {

	transform(items: Array<any>, today: Date): any {
		return items.filter(item => item.end.dateTime > today);
	}

}
