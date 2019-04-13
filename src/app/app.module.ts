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

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    EventsComponent,
    NewEventsComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, DatabaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
