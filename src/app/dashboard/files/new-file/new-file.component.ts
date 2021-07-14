import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {FileService} from "../../../services/file.service";
import {AngularFireStorage} from "@angular/fire/storage";
import firebase from "firebase";
import User = firebase.User;
import {EventService} from "../../../services/event.service";
import {Event} from "../../../interfaces/event";

@Component({
  selector: 'app-new-file',
  templateUrl: './new-file.component.html',
  styleUrls: ['./new-file.component.scss']
})
export class NewFileComponent implements OnInit {

  @Input() user = {} as User;
  fileForm: FormGroup;
  date = new Date();
  saveSuccess = false;

  prosecutor = '';
  assistantProsecutor = '';
  uploadPercent: Observable<number> | any;
  fileUpload: Observable<string> | any;
  fileName = '';
  prosecutors = [
    {name: 'SACK RAMOS SYLVIA JACQUELINE', charge: 'FISCAL PROVINCIAL'},
    {name: 'ORTIZ GARCIA MARIA DEL CARMEN', charge: 'FISCAL ADJUNTA'},
    {name: 'DIAZ SOSA ROSA', charge: 'FISCAL ADJUNTA'},
    {name: 'PRO CASTILLO ALLICE SUSANA', charge: 'FISCAL ADJUNTA'},
    {name: 'CHAVESTA ANGELES LUIS FERNANDO', charge: 'FISCAL ADJUNTO'},
  ];

  assistants = [
    {name: 'SACK RAMOS SYLVIA JACQUELINE', charge: 'FISCAL PROVINCIAL'},
    {name: 'ORTIZ GARCIA MARIA DEL CARMEN', charge: 'FISCAL ADJUNTA'},
    {name: 'DIAZ SOSA ROSA', charge: 'FISCAL ADJUNTA'},
    {name: 'PRO CASTILLO ALLICE SUSANA', charge: 'FISCAL ADJUNTA'},
    {name: 'CHAVESTA ANGELES LUIS FERNANDO', charge: 'FISCAL ADJUNTO'},
    {name: 'MENDOZA MUÑOZ AMERICO', charge: 'ASISTENTE FISCAL'},
    {name: 'PEÑA ANYARIN EMILYN SOLANGE', charge: 'ASISTENTE FISCAL'},
    {name: 'SANCHEZ PEREZ FRANCISCO ELVIS', charge: 'ASISTENTE FISCAL'},
    {name: 'CURASMA SANCHEZ HENRRY', charge: 'ASISTENTE FISCAL'},
    {name: 'TIMOTEO VENTURO JOSE LUIS', charge: 'ASISTENTE FISCAL'}
  ];

  constructor(private fb: FormBuilder, private fileSvc: FileService, private storage: AngularFireStorage, private eventSvc: EventService) {
    this.fileForm = this.fb.group({
      fiscalFolder: [''],
      openingDate: [''],
      proceduralDeadline: [''],
      crime: [''],
      accused: [''],
      aggrieved: [''],
      proceduralStage: [''],
      court: [''],
      fileNumber: [''],
      processStatus: [''],
      pendingAction: [''],
      typeDiligence: [''],
      dateNotification: [''],
      hearingDate: [''],
      hearingTime: [''],
      hearingLink: [''],
    });
  }


  ngOnInit(): void {
  }

  getProsecutor(event: any) {
    this.prosecutor = event.value;
  }

  getAssistantProsecutor(event: any) {
    this.assistantProsecutor = event.value;
  }

  getFileUpload(event: any) {
    const file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    const filePath = 'files/' + this.fileName;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoURL: any): void {
    const event: any = [] as Event[];
    const eventId = event?.id || null;

    if (this.fileForm.valid) {
      const file = this.fileForm.value;
      const fileId = file?.id || null;
      file.userId = userId;
      file.userDisplayName = userDisplayName;
      file.userPhotoURL = userPhotoURL;
      file.userEmail = userEmail;
      file.createdAt = this.date;
      file.prosecutor = this.prosecutor;
      file.assistantProsecutor = this.assistantProsecutor;
      file.openingDate = new Date(file.openingDate + 'T00:00:00');
      file.dateNotification = new Date(file.dateNotification + 'T00:00:00');
      event.dateEvent = new Date(file.hearingDate + 'T00:00:00');
      event.startEvent = new Date(file.hearingDate + 'T' + file.hearingTime + ':00');
      file.hearingDate = new Date(file.hearingDate + 'T' + file.hearingTime + ':00');
      event.userId = userId;
      event.userDisplayName = userDisplayName;
      event.userPhotoURL = userPhotoURL;
      event.userEmail = userEmail;
      event.createdAt = this.date;
      event.nameEvent = 'Reunion: del expediente: ' + file.fileNumber;
      event.linkEvent = file.hearingLink;
      file.fileUrl = this.fileName;
      this.fileSvc.saveFile(file, fileId).then(r => r).catch(error => console.log(error));
      this.eventSvc.saveEvent(event, eventId).then(r => r).catch(error => console.log(error));
      this.saveSuccess = true;
      this.fileForm.reset();

    }
    this.fileForm.reset();
  }

}
