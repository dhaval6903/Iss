import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Use window.location.href for navigation
    window.location.href = '/Home';
  }
}
