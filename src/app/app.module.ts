import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { EventsComponent } from './events/events.component';
import { NewEventsComponent } from './events/new-events/new-events.component';
import { MaterialModule } from './material/material.module';
import { LandingComponent } from './landing/landing.component';
import { AuthService } from './core/auth.service';
import { DatabaseService } from './core/database.service';
import { AuthGuard } from './core/auth.guard';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { StudentComponent } from './profile/student/student.component';
import { OrganizationComponent } from './profile/organization/organization.component';
import { OrgListEventsComponent } from './events/org-list-events/org-list-events.component';
import { SingleEventComponent } from './events/single-event/single-event.component';
import { RateStudentsComponent } from './events/org-list-events/rate-students/rate-students.component';
import { OrgEventComponent } from './events/org-list-events/org-event/org-event.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    EventsComponent,
    NewEventsComponent,
    LandingComponent,
    StudentComponent,
    OrganizationComponent,
    OrgListEventsComponent,
    SingleEventComponent,
    RateStudentsComponent,
    OrgEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEOcbQVAILnMAsXiNBrZkuxdYdwb7NXZY',
      libraries: ["places"]
    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [AuthService, DatabaseService, AuthGuard, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
  entryComponents: [NewEventsComponent]
})
export class AppModule { }
