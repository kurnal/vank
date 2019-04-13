import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseUser } from './auth.service';
import * as firebase from 'firebase';

export interface Event {
  id: string;
  organization: string;
  description: string;
  requestAmount: number;
  students: {
    [uid: string]: FirebaseUser
  };
  location: firebase.firestore.GeoPoint;
  tags: string[];
  startDate: firebase.firestore.Timestamp | Date;
  endDate: firebase.firestore.Timestamp | Date;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  eventsCollection: AngularFirestoreCollection<Event>;
  constructor(private afs: AngularFirestore) { 
    this.eventsCollection = this.afs.collection("events");
  }


}
