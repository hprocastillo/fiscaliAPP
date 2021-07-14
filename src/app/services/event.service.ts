import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Event} from "../interfaces/event";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  events: Observable<Event[]>;
  eventsCollection: AngularFirestoreCollection<Event>;

  constructor(private readonly afs: AngularFirestore) {
    this.eventsCollection = afs.collection<Event>('events');
    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Event;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }

  getEventByDate(date: any) {
    return this.afs.collection<Event>('events', ref => ref.where('dateEvent', '==', date))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Event;
          const id = a.payload.doc.id;
          return {id, ...data};
        })));
  }

  saveEvent(event: Event, eventId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const id = eventId || this.afs.createId();
        const data = {id, ...event};
        const result = await this.eventsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getEvents(): any {
    return this.events;
  }
}
