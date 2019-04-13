import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../core/database.service';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  async signInWithGoogle() {
    await this.auth.googleLogin();
    return await this.afterSignIn();
  }

  private afterSignIn() {
    // Do after login stuff here, such router redirects, toast messages, etc.
    return this.router.navigate(['/profile']);
  }

}
