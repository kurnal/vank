import { Component, OnInit, Input } from '@angular/core';
import { Event, DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-single-event',
  templateUrl: './single-event.component.html',
  styleUrls: ['./single-event.component.scss']
})
export class SingleEventComponent implements OnInit {

  @Input()
  event: Event;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  join() {
    this.db.signUp(this.event.id);
  }
}
