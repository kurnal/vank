import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { firebase } from '@firebase/app';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

export interface FirebaseUser {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  rank: number;
  completedEvents: number;
  bio: string;
  references: {
    [uid: string]: string
  };
  ratings: {
    [eventId: string]: number
  };
  age: number;
  organization: boolean;
  orgData: {
    orgName: string,
    verified: boolean
  };
}

@Injectable()
export class AuthService {
  user: Observable<FirebaseUser | null>;
  public userDoc: FirebaseUser;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<FirebaseUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.user.subscribe((user: FirebaseUser) => {
      this.userDoc = user;
    });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }


  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: Partial<FirebaseUser> = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    };
    return userRef.set(data, {merge: true});
  }

  get currentUserObservable(): any {
    return this.afAuth.authState;
  }
}