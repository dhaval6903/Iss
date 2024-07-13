import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.css'
})
export class TaskViewComponent {

  
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
