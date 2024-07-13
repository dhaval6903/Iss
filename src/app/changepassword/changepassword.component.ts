import { Component } from '@angular/core';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {

  newpassword: string = '';
  confirmpassword: string = '';
  isMatched: boolean = false;

  

  checkPasswordMatch(): void {
    this.isMatched = this.newpassword === this.confirmpassword;
  }

}
