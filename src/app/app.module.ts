import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		NgbPaginationModule,
		NgbAlertModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule
	],
	providers: [AngularFirestore],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
