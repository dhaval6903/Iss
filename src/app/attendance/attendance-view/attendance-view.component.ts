import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; 
import { AttendanceEditComponent } from '../attendance-edit/attendance-edit.component';
import { AttendanceMapComponent } from '../attendance-map/attendance-map.component';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrl: './attendance-view.component.css'
})
export class AttendanceViewComponent implements OnInit {

  
  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  a_id: number = 0;

  
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

  // Child functions that call the parent function
  DeleteCost(a_id: number): void {
    this.showAlert(
      'Are You Sure, You want to Delete this Data?',
    ).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.apiService.AdminAttendanceDelete(a_id).subscribe(
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

  EditCost(a_id: Number): void {
    const modalRef = this.modalService.open(AttendanceEditComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = a_id;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  Map(a_id: Number): void {
    const selectedRow = this.BindData.find((row: any) => row.a_id === a_id);
    if (selectedRow) {
      const modalRef = this.modalService.open(AttendanceMapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
      modalRef.componentInstance.latitude = selectedRow.a_lat;
      modalRef.componentInstance.longitude = selectedRow.a_long;
    }
  }

  TableDataList(){
    this.apiService.AdminGetAttendance(this.a_id).subscribe(data => {
      debugger;
      if(data.responseCode == 200){
        this.BindData = data.data;
        this.LoaderShow = false;
      }else{
        this.NodataLable = true;
        this.LoaderShow = false;
        //this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    })
  }

}
