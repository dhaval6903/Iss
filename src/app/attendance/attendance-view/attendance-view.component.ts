import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  empid: number = 0;
  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  EmpBind: any;
  AllEmp: number = 0;
  MonthData: any;
  // Month: number = 0;
  month: string = ''; 
  dateChanged: boolean = false; 

  
  constructor(private modalService: NgbModal,public router: Router, private http: HttpClient, private httpClient: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { } // Inject ApiService

  ngOnInit() {
    this.getEmp();
    this.getMonth();
    this.TableDataList(this.empid, this.month); 
    debugger;
  }

  getEmp() {
    this.apiService.AdminGetEmp(this.empid).subscribe(data => {
        if(data.responseCode == 200){
          this.EmpBind = data.data;
        }
      },
      (error) => {
        this.toastrService.error('Error fetching users', 'Error');
      }
    );
  }

  getMonth() {
    this.apiService.AdminGetAttendanceMonth().subscribe(data => {
        if(data.responseCode == 200){
          this.MonthData = data.data;
        }
      },
      (error) => {
        this.toastrService.error('Error fetching users', 'Error');
      }
    );
  }

  

  EditCost(empid: Number): void {
    const modalRef = this.modalService.open(AttendanceEditComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = empid;
    modalRef.result.then((result) => {
      this.TableDataList(this.empid, this.month);
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  Map(att_latitudeIN: number, att_longitudeIN: number, att_latitudeOUT: number, att_longitudeOUT: number): void {
    const modalRef = this.modalService.open(AttendanceMapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.att_latitudeIN = att_latitudeIN;
    modalRef.componentInstance.att_longitudeIN = att_longitudeIN;
    modalRef.componentInstance.att_latitudeOUT = att_latitudeOUT;
    modalRef.componentInstance.att_longitudeOUT = att_longitudeOUT;
  }
  
  

  TableDataList(empid: number, month: string) {
    debugger;
    this.LoaderShow = true;
    this.NodataLable = false; 
    this.BindData = []; 
    debugger;
    this.apiService.AdminGetAttendanceEmpWise(empid, month).subscribe(
      (data) => {
        debugger;
        if (data.responseCode == 200) {
          this.BindData = data.data; 
          this.LoaderShow = false; 
        } else {
          this.NodataLable = true; 
          this.LoaderShow = false; 
        }
      }, error => {
        this.toastrService.error('Something went Wrong', 'Error!');
      })
    }


    SearchData() {
      {{this.AllEmp}}
      this.TableDataList(this.AllEmp, this.month);
      this.dateChanged = true;
  }
  
  clearData() {
    this.AllEmp = 0;  // Reset the employee dropdown to the placeholder
    this.month = '';  // Reset the month dropdown to the placeholder
    this.dateChanged = false;  // Reset the dateChanged flag
  
    this.EmpBind = [];  // Clear the employee data
    this.MonthData = [];  // Clear the month data
  
    this.ngOnInit();  // Reinitialize the component
  }
  

}
