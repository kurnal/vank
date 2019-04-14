import { Component, OnInit, ViewChild, Inject, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSidenav } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../events.component';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
 
@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.scss']
})

export class NewEventsComponent implements OnInit {
  
  form: FormGroup;

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(private db: DatabaseService, @Inject(MAT_DIALOG_DATA) public data: DialogData, 
  private fb: FormBuilder) {
    this.form = this.fb.group({
      description: ['',[Validators.required]],
      requestAmount: ['',[Validators.required]],
      tags: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]]
    });
  }

  @ViewChild(AgmMap) map: AgmMap;
  
  ngOnInit() {
      
  }

  submit() {
    let formValue = this.form.value;
    this.db.createNewListing(formValue, "1", "2");
  }

}

