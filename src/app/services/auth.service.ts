import {Injectable} from '@angular/core';
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import auth = firebase.auth;
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	user$: Observable<firebase.User>;

	constructor(public afAuth: AngularFireAuth) {
		// @ts-ignore
		this.user$ = afAuth.authState;
	}


	// @ts-ignore
	async loginGoogle() {
		try {
			return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
		} catch (error) {
			console.log(error);
		}
	}

	async logout() {
		try {
			await this.afAuth.signOut();
		} catch (error) {
			console.log(error);
		}
	}
}