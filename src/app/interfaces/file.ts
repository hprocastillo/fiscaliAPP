import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface File {
	id?: string;
	userId: string;
	userDisplayName: string;
	userEmail: string;
	userPhotoURL: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
	fiscalFolder: string;
	openingDate: Timestamp;
	proceduralDeadline: number;
	prosecutor: string;
	assistantProsecutor: string;
	crime: string;
	accused: string;
	aggrieved: string;
	proceduralStage: string;
	court: string;
	fileNumber: string;
	processStatus: string;
	pendingAction: string;
	typeDiligence: string;
	dateNotification: Timestamp;
	hearingDate: Timestamp;
	hearingTime: Timestamp;
	hearingLink: string;
	fileUrl: string;
}