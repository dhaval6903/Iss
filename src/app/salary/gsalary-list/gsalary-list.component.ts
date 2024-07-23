import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalaryViewComponent } from '../salary-view/salary-view.component';
import { GsalaryPayComponent } from '../gsalary-pay/gsalary-pay.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './gsalary-list.component.html',
  styleUrls: ['./gsalary-list.component.css']
})
export class GsalaryListComponent implements OnInit {
  empid: number = 0;
  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  EmpBind: any;
  AllEmp: number = 0;
  MonthData: any;
  month: string = ''; 
  dateChanged: boolean = false; 
  sa_paySalary: number = 0;
  showTable: boolean = false;
  isButtonsDisabled: boolean = false; // State variable to disable buttons

  constructor(private modalService: NgbModal, public router: Router, private http: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { }

  ngOnInit() {
    
    this.getEmp();
    this.getMonth();
    this.TableDataList();
    debugger;
  }

  getEmp() {
    this.apiService.AdminGetEmp(this.empid).subscribe(data => {
      if (data.responseCode == 200) {
        this.EmpBind = data.data;
      }
    }, (error) => {
      this.toastrService.error('Error fetching users', 'Error');
    });
  }

  getMonth() {
    this.apiService.AdminGetAttendanceMonth().subscribe(data => {
      if (data.responseCode == 200) {
        this.MonthData = data.data;
      }
    }, (error) => {
      this.toastrService.error('Error fetching users', 'Error');
    });
  }

  TableDataList() {
    this.LoaderShow = true;
    this.NodataLable = false;
    this.BindData = [];
    this.sa_paySalary = 0; // Reset total salary
  
    const empid = this.AllEmp === 0 ? 0 : this.AllEmp;
    const month = this.month === '' ? '' : this.month;
  
    this.apiService.AdminGetSalarySavedData(empid, month).subscribe(
      (data) => {
        if (data.responseCode == 200) {
          this.BindData = data.data;
          if (this.BindData.length > 0) {
            this.calculateTotalSalary();
          } else {
            this.sa_paySalary = 0; // Ensure total salary is reset
          }
          this.LoaderShow = false;
        } else {
          this.NodataLable = true;
          this.LoaderShow = false;
        }
      }, error => {
        this.toastrService.error('Something went Wrong', 'Error!');
      });
  }

  View(empid: Number, month: string): void {
    const modalRef = this.modalService.open(SalaryViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = empid;
    modalRef.componentInstance.monthname = month;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }
  

  calculateTotalSalary() {
    this.sa_paySalary = this.BindData.reduce((total: number, row: any) => total + parseFloat(row.sa_paySalary), 0);
  }



  // Pay(empid: Number, month: string): void {
  //   const modalRef = this.modalService.open(GsalaryPayComponent, { size: 'lg', backdrop: 'static', keyboard: false });
  //   modalRef.componentInstance.editid = empid;
  //   modalRef.componentInstance.monthname = month;
  //   modalRef.result.then((result) => {
  //     this.TableDataList();
  //   }, (reason) => {
  //     // Handle modal dismiss event if needed
  //   });
  // }


  Pay(empid: number, month: string): void {
    const modalRef = this.modalService.open(GsalaryPayComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = empid;
    modalRef.componentInstance.monthname = month;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }



  SearchData() {
    this.TableDataList();
    this.dateChanged = true;
    this.showTable = true;
  }

  
  

  // isSearchButtonEnabled(): boolean {
  //   return this.AllEmp !== 0 && this.month !== '';
  // }

  clearData() {
    this.AllEmp = 0;  // Reset the employee dropdown to the placeholder
    this.month = '';  // Reset the month dropdown to the placeholder
    this.dateChanged = false;  // Reset the dateChanged flag

    this.EmpBind = [];  // Clear the employee data
    this.MonthData = [];  // Clear the month data

    this.sa_paySalary = 0;  // Reset the total salary to 0
    this.showTable = false;
    this.isButtonsDisabled = false; // Enable buttons again

    this.ngOnInit();  // Reinitialize the component
  }
}
