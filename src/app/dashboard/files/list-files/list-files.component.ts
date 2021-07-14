import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {FileService} from "../../../services/file.service";
import {AuthService} from "../../../services/auth.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit, OnChanges, OnDestroy {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  @Input() showType: string | undefined;
  @Input() searchText: string = '';
  /* query files */
  allFiles: any = [];
  filterFiles: any = [];

  today = new Date;
  private unsubscribe$ = new Subject<void>();
  /*data hearing */
  hearingDate: any;
  hearingLink: string | any;
  prosecutor: string | any;

  constructor(private fileSvc: FileService, private authSvc: AuthService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fileSvc.getFiles()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.allFiles = res;

        switch (this.showType) {
          case '0':
            this.filterFiles = [];
            this.filterFiles = this.allFiles;
            break;
          case '1':
            this.filterFiles = [];
            for (let i: number = 0; i < this.allFiles.length; i++) {
              const openingDate = this.allFiles[i].openingDate.toDate().getTime();
              const deadline = (this.allFiles[i].proceduralDeadline - 5) * 86400000;
              const today = this.today.getTime();
              if ((today > openingDate) && (today < (openingDate + deadline))) {
                this.filterFiles.push(this.allFiles[i]);
              }
            }
            break;
          case '2':
            this.filterFiles = [];
            for (let i: number = 0; i < this.allFiles.length; i++) {
              const openingDate = this.allFiles[i].openingDate.toDate().getTime();
              const deadlineFull = this.allFiles[i].proceduralDeadline * 86400000;
              const deadlineLeft = (this.allFiles[i].proceduralDeadline - 5) * 86400000;
              const today = this.today.getTime();
              if ((today > (openingDate + deadlineLeft)) && (today < (openingDate + deadlineFull))) {
                this.filterFiles.push(this.allFiles[i]);
              }
            }
            break;
          case '3':
            this.filterFiles = [];
            for (let i: number = 0; i < this.allFiles.length; i++) {
              const openingDate = this.allFiles[i].openingDate.toDate().getTime();
              const deadline = this.allFiles[i].proceduralDeadline * 86400000;
              const today = this.today.getTime();
              if (today >= (openingDate + deadline)) {
                this.filterFiles.push(this.allFiles[i]);
              }
            }
            break;
          default:
            break;
        }
      });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  showHearing(hearingDate: any, hearingLink: string, prosecutor: string) {
    this.hearingDate = hearingDate;
    this.hearingLink = hearingLink;
    this.prosecutor = prosecutor;
  }


}
