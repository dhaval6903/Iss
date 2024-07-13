import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; 
import { StudentAddComponent } from '../student-add/student-add.component';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit {

  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  std_id: number = 0;

  constructor(private modalService: NgbModal,public router: Router, private http: HttpClient, private httpClient: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { } // Inject ApiService

  ngOnInit(): void {
    this.TableDataList(); 
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


  DeleteStudent(std_id: number): void {
    this.showAlert(
      'Are You Sure, You want to Delete this Data?',
      
    ).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.apiService.AdminStudentDelete(std_id).subscribe(
          (data: any) => {
            if (data.responseCode == 200) {
              this.toastrService.success(data.responseMessage, 'Successfully Deleted');
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

  showEditStudentForm(std_id: Number): void {
    const modalRef = this.modalService.open(StudentAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = std_id;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  openAddStudentForm(): void {
    const modalRef = this.modalService.open(StudentAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = 0;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
      this.ngOnInit();
    });
  }

  TableDataList() {
    this.apiService.AdminGetStudent(this.std_id).subscribe(data => {
      if (data.responseCode == 200) {
        this.BindData = data.data;
        this.LoaderShow = false;
      } else {
        this.NodataLable = true;
        this.LoaderShow = false;
        // this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    });
  }
  

}
