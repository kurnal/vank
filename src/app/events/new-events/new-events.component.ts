import { Component, OnInit, ViewChild, Inject, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { DatabaseService } from 'src/app/core/database.service';
import { MatSidenav } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';

import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

 
@Component({
  selector: 'app-new-events',
  templateUrl: './new-events.component.html',
  styleUrls: ['./new-events.component.scss']
})

export class NewEventsComponent implements OnInit {
  
  form: FormGroup;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  @ViewChild('search') searchElementRef: ElementRef;

  constructor(private db: DatabaseService, private fb: FormBuilder, private dialogRef: MatDialogRef<NewEventsComponent>) {
    this.form = this.fb.group({
      description: ['',[Validators.required]],
      requestAmount: ['',[Validators.required]],
      tags: ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate: ['',[Validators.required]]
    });
  }
  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit() {
      this.zoom = 10;
      this.latitude = 52.520008;
      this.longitude = 13.404954;

      this.setCurrentPosition();
    }

    private setCurrentPosition() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
      }
    }
  
    onAutocompleteSelected(result: PlaceResult) {
      console.log('onAddressSelected: ', result);
    }
  
    onLocationSelected(location: Location) {
      this.latitude = location.latitude;
      this.longitude = location.longitude;
    }
    
  submit() {
    let formValue = this.form.value;
    this.db.createNewListing(formValue, this.latitude, this.longitude);
    this.form.reset();
    this.dialogRef.close();
  }

}

