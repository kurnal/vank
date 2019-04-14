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

  constructor(private db:DatabaseService, public auth: AuthService,
    private fb:FormBuilder) { 
      this.form = this.fb.group({
        description:['',[Validators.required]],
        orgName: ['',[Validators.required]]
      });
    }

  ngOnInit() {}

  submit() {
    let payload = {
      description: this.form.value.description,
      orgData: {
        orgName: this.form.value.orgName,
        verified: true
      }
    };

    this.db.updateProfile(payload);
  }
}
