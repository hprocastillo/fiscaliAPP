import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from "../../../services/event.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Event} from "../../../interfaces/event";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnChanges, OnDestroy {
  @Input() day: any;
  @Input() month: any;
  @Input() year: any;
  event = [] as Event[];
  private unsubscribe$ = new Subject<void>();
  closeResult = '';
  today = new Date();

  constructor(private eventSvc: EventService, private modalService: NgbModal) {
  }

  ngOnInit(): void {

  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const date = new Date(this.year + '-' + (this.month + 1) + '-' + this.day + ' ' + '00:00:00');
    this.eventSvc.getEventByDate(date)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.event = res;

      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
