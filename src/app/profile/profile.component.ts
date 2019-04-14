import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
 
  // userDoc: AngularFirestoreDocument<any>;
  // user: Observable<any>;

  constructor(public auth: AuthService, private afs: AngularFirestore) { }

  ngOnInit() {
  }

}
