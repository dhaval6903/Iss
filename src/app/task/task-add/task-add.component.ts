import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.css'
})
export class TaskAddComponent {

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
