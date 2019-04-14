import { Component, OnInit, Input } from '@angular/core';
import { Event } from 'src/app/core/database.service';
import { Timestamp } from '@firebase/firestore-types';

@Component({
  selector: 'app-org-event',
  templateUrl: './org-event.component.html',
  styleUrls: ['./org-event.component.scss']
})
export class OrgEventComponent implements OnInit {

  @Input()
  event: Event;

  past: boolean = false;

  constructor() { }

  ngOnInit() {
    // console.log((new Date()).getMilliseconds());
    console.log((this.event.endDate as Timestamp).toMillis());
    this.past = (new Date()).getTime() > (this.event.endDate as Timestamp).toMillis(); 
    
  }

  getStudents() {
    if(this.event.students) {
      return Object.values(this.event.students);
    } else {
      return [];
    }
    
  }

}
