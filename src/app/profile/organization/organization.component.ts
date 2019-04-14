import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { AuthService } from 'src/app/core/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {

  form: FormGroup;

  constructor(private db:DatabaseService, private auth: AuthService,
    private fb:FormBuilder) { 
      this.form = this.fb.group({
        bio:['',[Validators.required]],
        orgName: ['',[Validators.required]]
      });
    }

  ngOnInit() {}

  submit() {
    let payload = {
      bio: this.form.value.bio,
      orgData: {
        orgName: this.form.value.orgName,
        verified: true
      }
    };

    this.db.updateProfile(payload);
  }
}
