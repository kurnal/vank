import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { DatabaseService, Event } from 'src/app/core/database.service';
import { Observable } from 'rxjs';

export interface ListingCharacteristics {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-org-list-events',
  templateUrl: './org-list-events.component.html',
  styleUrls: ['./org-list-events.component.scss']
})

export class OrgListEventsComponent implements OnInit {

  events: Observable<Event[]>;

  constructor(public auth: AuthService, private db: DatabaseService) { 
    this.events = this.db.getOrganizationEvents();
  }

  ngOnInit() {
   
  }

}
