import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService, Event } from 'src/app/core/database.service';

@Component({
  selector: 'app-rate-students',
  templateUrl: './rate-students.component.html',
  styleUrls: ['./rate-students.component.scss']
})
export class RateStudentsComponent implements OnInit {

  @Input()
  student: any;

  @Input()
  event: Event;
  rated: boolean = false;

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

  setRating(rating) {
    this.db.rateStudent(this.student.user.uid, this.event.id, rating);
    this.rated = true;
  }

}
