import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { DatabaseService } from 'src/app/core/database.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  form: FormGroup;

  constructor(public auth: AuthService, private db: DatabaseService,
    private fb: FormBuilder) { 
      this.form = this.fb.group({
        age:['',[Validators.required]],
        description: ['',[Validators.required]]
      });
    }

  ngOnInit() {}

  submit() {
    let payload = {
      age: this.form.value.age,
      description: this.form.value.description
    };

    this.db.updateProfile(payload);
  }

}
