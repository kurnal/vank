import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { DatabaseService } from 'src/app/core/database.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(public auth: AuthService, private db: DatabaseService) { }

  ngOnInit() {
  }

}
