import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {FilesComponent} from "./files/files.component";
import {CalendarComponent} from "./calendar/calendar.component";

const routes: Routes = [
	{path: '', component: DashboardComponent},
	{path: 'files', component: FilesComponent},
	{path: 'calendar', component: CalendarComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {
}
