import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; // Import Router
import { TaskViewComponent} from '../task-view/task-view.component';
 

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrl: './task-update.component.css'
})
export class TaskUpdateComponent {

  
  constructor(private modalService: NgbModal, private router: Router) { } // Inject Router

  

  openTaskViewForm(): void {
    const modalRef = this.modalService.open(TaskViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => {
      // Handle modal close event if needed
      // For example, you may want to refresh the employee list after adding a new employee
      this.refreshTaskUpdate();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  refreshTaskUpdate(): void {
    // Method to refresh the employee list after adding or editing an employee
  }




}
