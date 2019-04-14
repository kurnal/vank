import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatabaseService, Event } from 'src/app/core/database.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewEventsComponent } from './new-events/new-events.component';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})

export class EventsComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  radius;

  events: Observable<Event[]>;
  
  constructor(private db: DatabaseService, public auth: AuthService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewEventsComponent, {
      width: '600px',
      height: '800px',
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
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  search() {
    this.events = this.db.getEvents(this.latitude, this.longitude, this.radius);
  }

}
