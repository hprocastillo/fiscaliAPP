import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase";
import User = firebase.User;
import {EventService} from "../../../services/event.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  @Input() user = {} as User;
  date = new Date();
  saveSuccess = false;
  eventForm: FormGroup;

  constructor(private fb: FormBuilder, private eventSvc: EventService) {
    this.eventForm = this.fb.group({
      nameEvent: [''],
      linkEvent: [''],
      dateEvent: [''],
      startEvent: [''],
      endEvent: ['']
    });
  }

  ngOnInit(): void {
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any): void {
    if (this.eventForm.valid) {
      const event = this.eventForm.value;
      const eventId = event?.id || null;
      event.userId = userId;
      event.userDisplayName = userDisplayName;
      event.userPhotoURL = userPhotoUrl;
      event.userEmail = userEmail;
      event.createdAt = this.date;
      event.startEvent = new Date(event.dateEvent + 'T' + event.startEvent + ':00');
      event.endEvent = new Date(event.dateEvent + 'T' + event.endEvent + ':00');
      event.dateEvent = new Date(event.dateEvent + 'T00:00:00');
      this.eventSvc.saveEvent(event, eventId).then(r => r).catch(error => console.log(error));
      this.saveSuccess = true;
      this.eventForm.reset();
    }
    this.eventForm.reset();
  }
}
