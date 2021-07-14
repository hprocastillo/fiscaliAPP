import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface Alert {
	id?: string;
	userId: string;
	userDisplayName: string | null;
	userEmail: string | null;
	userPhotoURL: string | null;
	fileNumber: string;
	fileUrl: string;
	openingDate: Timestamp;
	proceduralDeadline: number;
	leftDays: number;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}