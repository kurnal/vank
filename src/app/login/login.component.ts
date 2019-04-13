import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  ngOnInit() {
  }

}
