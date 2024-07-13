import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; 
import { EmployeeAddComponent } from '../employee-add/employee-add.component';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
// declare var $: any;


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  empid: number = 0;

  constructor(private modalService: NgbModal,public router: Router, private http: HttpClient, private httpClient: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { } // Inject ApiService

  ngOnInit(): void {
    this.TableDataList(); // Fetch employee list on component initialization
    debugger;
  }

  showAlert(text: string): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      text: text,
    
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    });
  }

  // showDeleteAlert(): void {
  //   this.showAlert(
  //     'Are you sure?',
  //     'You want to Delete this Data!!!!',
  //     'warning'
  //   ).then((result: SweetAlertResult<any>) => {
  //     if(result.isConfirmed)
  //     {
  //       window.location.href = '/Home';
  //     } 
  //     else if (result.dismiss === Swal.DismissReason.cancel) {
  //       window.location.href = '/employee/employee-list';
  //     }
  //   });
  // }

  DeleteEmployee(emp_id: number): void {
    this.showAlert(
      'Are You Sure, You want to Delete this Data?',
      
    ).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.apiService.AdminEmpDelete(emp_id).subscribe(
          (data: any) => {
            if (data.responseCode == 200) {
              this.toastrService.success(data.responseMessage, 'Success');
              this.TableDataList(); // Assuming this method updates the table data after delete
            } else {
              this.toastrService.error(data.responseMessage, 'Error');
            }
          },
          (error: any) => {
            this.toastrService.error('Something went wrong!', 'Error');
          }
        );
      }
    });
  }

  showEditEmployeeForm(empid: Number): void {
    const modalRef = this.modalService.open(EmployeeAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = empid;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  openAddEmployeeForm(): void {
    const modalRef = this.modalService.open(EmployeeAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = 0;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
      this.ngOnInit();
    });
  }

  TableDataList() {
    this.apiService.AdminGetEmp(this.empid).subscribe(data => {
      if (data.responseCode == 200) {
        this.BindData = data.data;
        this.LoaderShow = false;
      } else {
        this.NodataLable = true;
        this.LoaderShow = false;
        // this.toastrService.error(data.responseMessage, 'Error!');
      }
      // setTimeout(() => {
      //   $(document).ready(() => {
      //     $('#table_data').DataTable();
      //   });
      // }, 100);
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    });
  }
  

  openResume(resumeUrl: string): void {
    window.open(resumeUrl, '_blank');
  }

  openImage(iconUrl: string): void {
    window.open(iconUrl, '_blank');
  }

  // DataDelete(iconid: number){
    
  //   if (confirm("Are you sure you want to Delete this record?")) {

  //     this.APIService.IconDelete(iconid).subscribe(data => {
  //       debugger;
  //       if(data.responseCode == 200){
  //         this.TableDataList();
  //         this.toastrService.success(data.responseMessage, 'Success');
  //       }else{
  //         this.toastrService.error(data.responseMessage, 'Error!');
  //       }
  //     }, error => {
  //       this.toastrService.error('Something went Wrong', 'Error!');
  //     })

  //   }
  // }


}
