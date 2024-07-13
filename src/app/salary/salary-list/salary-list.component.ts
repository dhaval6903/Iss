import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'; // Import Router
import { SalaryAddComponent } from '../salary-add/salary-add.component';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; 
import { from } from 'rxjs';
import { AttendanceMapComponent } from '../../attendance/attendance-map/attendance-map.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrl: './salary-list.component.css'
})
export class SalaryListComponent {

  
  
  constructor(private modalService: NgbModal, private router: Router) { } // Inject Router

  showAlert(title: string, text: string, icon: SweetAlertIcon): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No!'
    });
  }

  // Child functions that call the parent function
  showAlert1(): void {
    this.showAlert(
      'Are you sure?',
      'You want to Delete this Data!!!!',
      'warning'
    ).then((result: SweetAlertResult<any>) => {
      console.log(result); // You can handle the result here
      if (result.isConfirmed) {
        this.router.navigate(['/Home']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/salary/salary-list']);
      }
    });
  }

  showEditAlert(): void {
    this.showAlert(
      'Are you sure?',
      'You want to Edit this Data!!!!',
      'info'
    ).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.router.navigate(['/Home']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/salary/salary-list']);
      }
    });
  }

  openAddSalaryForm(): void {
    const modalRef = this.modalService.open(SalaryAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => {
      // Handle modal close event if needed
      // For example, you may want to refresh the employee list after adding a new employee
      this.refreshSalaryList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  openMap(): void {
    const modalRef = this.modalService.open(AttendanceMapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => {
      // Handle modal close event if needed
      // For example, you may want to refresh the employee list after adding a new employee
      this.refreshSalaryList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  // openMap(): void {
  //   const latitude = 22.1608;
  //   const longitude = 71.7705;

  //   const modalRef = this.modalService.open(AttendanceMapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  //   modalRef.componentInstance.latitude = latitude; // Pass latitude
  //   modalRef.componentInstance.longitude = longitude; // Pass longitude

  //   modalRef.result.then((result) => {
  //     // Handle modal close event if needed
  //     console.log('Modal closed:', result);
  //   }, (reason) => {
  //     // Handle dismiss or cancel event if needed
  //     console.log('Modal dismissed:', reason);
  //   });
  // }

  refreshSalaryList(): void {
    // Method to refresh the employee list after adding or editing an employee
  }
  
  
  


}
