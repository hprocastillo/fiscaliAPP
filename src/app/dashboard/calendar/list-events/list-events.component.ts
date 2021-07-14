import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import * as moment from "moment";
import {EventService} from "../../../services/event.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import firebase from "firebase";
import User = firebase.User;

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit, OnDestroy {
  @Input() user = {} as User;
  week: any = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  today = new Date();
  monthSelect: any = [];
  dateSelect: any;
  events: any = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private eventSvc: EventService) {
  }

  ngOnInit(): void {
    this.eventSvc.getEvents()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.events = res;
      });
    this.getDaysFromDate((this.today.getMonth() + 1), this.today.getFullYear());
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays)

    this.monthSelect = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      }
    });
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format("YYYY-MM");
    const parse = `${monthYear}-${day.value}`;
    console.log(parse);
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
