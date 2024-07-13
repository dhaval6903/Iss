import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salary-add',
  templateUrl: './salary-add.component.html',
  styleUrl: './salary-add.component.css'
})
export class SalaryAddComponent {

  lable: string = "Add";

  constructor(public activeModal: NgbActiveModal){}

  onSubmit() {
    // Add your form submission logic here
  }

  closeModal() {
    debugger;
    this.activeModal.close();
  }


}
