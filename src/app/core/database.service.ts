import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, 
  DocumentSnapshotDoesNotExist, DocumentSnapshotExists } from '@angular/fire/firestore';
import { FirebaseUser, AuthService } from './auth.service';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as geofirex from 'geofirex';
import { Observable } from 'rxjs';
import { DocumentSnapshot, DocumentData } from '@firebase/firestore-types';

export interface Event {
  id?: string;
  organization?: string;
  description: string;
  requestAmount: number;
  students?: {
    [uid: string]: {
      user: FirebaseUser,
      approved: boolean
    }
  };

  lat: string;
  lng: string;
  tags: string[];
  startDate: firebase.firestore.Timestamp | Date;
  endDate: firebase.firestore.Timestamp | Date;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  eventsCollection: AngularFirestoreCollection<Event>;
  public geo;

  constructor(private afs: AngularFirestore, private auth: AuthService) { 
    this.geo = geofirex.init(firebase);
    this.eventsCollection = this.afs.collection('events');
    console.log(auth);
  }

  public createNewListing(event: Partial<Event>, lat: string, lng: string) {
    const collection = this.geo.collection('users');


    // if (!this.auth.userDoc.organization) {
    //   return;
    // }

    const newEvent: Event = {
      id: this.afs.createId(),
      organization: this.auth.userDoc.displayName,
      description: event.description,
      requestAmount: event.requestAmount,
      students: {},
      lat: lat,
      lng: lng,
      tags: event.tags,
      startDate: event.startDate,
      endDate: event.endDate
    };
    console.log(newEvent)
    collection.setDoc(`${this.auth.userDoc.uid}/events/${newEvent.id}`, newEvent);
  }

  public getEvents(lat:string, lng:string, radius: number): Observable<Event[]> {
    const collection = this.geo.collection('events');
    const center = this.geo.point(lat, lng);
    const field = 'location';
    return collection.within(center, radius, field);
  }

  public updateProfile(user: Partial<FirebaseUser>) {
    this.set(`users/${this.auth.userDoc.uid}`, user);
  }

  public signUp(eventId: string) {
    this.set(`events/${eventId}`, {
      students: {
        [this.auth.userDoc.uid]: {
          user: this.auth.userDoc,
          approved: false
        }
      }
    });
  }

  public approveStudent(eventId: string, studentId: string) {
    this.set(`events/${eventId}`, {
      students: {
        [this.auth.userDoc.uid]: {
          approved: true
        }
      }
    });
  }

  public rateStudent(studentId: string, eventId: string, rating: number) {
    this.set(`users/${studentId}`, {
      ratings: {
        [eventId]: rating
      }
    }).then(() => {
      this.afs.doc<FirebaseUser>(`users/${studentId}`).ref.get().then((value: DocumentSnapshot) => {
        const payload: FirebaseUser = value.data() as FirebaseUser;
        let numEvents = 0;
        let rank = 5;
        if(payload.ratings) {
          let ratings = Object.values(payload.ratings);
          numEvents = ratings.length;
          if(numEvents > 0) {
            let sum = 0;
            for(let i=0; i<numEvents; i++) {
              sum += ratings[i];
            }
            sum /= numEvents;
            rank = sum;
          }
          this.set(`users/${studentId}`, {
            rank: rank,
            completedEvents: numEvents
          });
        }
      });
    });
  }

  private set(ref: string, data: any): Promise<void> {
    return this.afs.doc(ref).set(data, { merge: true });
  }
}
