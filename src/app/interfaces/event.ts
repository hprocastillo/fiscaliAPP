import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Event {
  id?: string;
  userId: string;
  userDisplayName: string;
  userEmail: string;
  userPhotoURL: string;
  nameEvent: string;
  linkEvent: string;
  members: [{
    userId: string,
    userDisplayName: string;
    userEmail: string;
    userPhotoURL: string;
  }];
  dateEvent: Timestamp;
  startEvent: Timestamp;
  endEvent: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
