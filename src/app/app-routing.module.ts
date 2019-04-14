import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';
import { NewEventsComponent } from './events/new-events/new-events.component';
import { OrgListEventsComponent } from './events/org-list-events/org-list-events.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "events/new",
    component: NewEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "events/my-events",
    component: OrgListEventsComponent,
    canActivate: [AuthGuard]
  },
  { path: "", 
    redirectTo: "/profile" ,
    pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
