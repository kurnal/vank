import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentSnapshotDoesNotExist, DocumentSnapshotExists } from '@angular/fire/firestore';
import { FirebaseUser, AuthService } from './auth.service';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface Event {
  id?: string;
  organization?: string;
  description: string;
  requestAmount: number;
  students?: {
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
  constructor(private afs: AngularFirestore, private auth: AuthService) { 
    this.eventsCollection = this.afs.collection("events");
  }

  public createNewListing(event: Event) {
    let event_id = this.afs.createId();
    this.set(`events/${event_id}`, event);
  }


  update(ref: string, data: any): Promise<void> {
    return this.afs.doc(ref).update(data);
  }

  set(ref: string, data: any): Promise<void> {
    return this.afs.doc(ref).set(data, { merge: true });
  }

  upsert<T>(ref: string, data: any): Promise<void> {
    const doc = this.afs
      .doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    return doc.then(
      (
        snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>
      ) => {
        return snap.payload.exists ? this.set(ref, data) : this.set(ref, data);
      }
    );
  }
}
