import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalaryViewComponent } from '../salary-view/salary-view.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {
  empid: number = 0;
  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  EmpBind: any;
  AllEmp: number = 0;
  MonthData: any;
  month: string = ''; 
  dateChanged: boolean = false; 
  Salary: number = 0;
  showTable: boolean = false;
  isButtonsDisabled: boolean = false; // State variable to disable buttons

  constructor(private modalService: NgbModal, public router: Router, private http: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { }

  ngOnInit() {
    
    this.getEmp();
    this.getMonth();
    this.TableDataList(this.empid, this.month);
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

  TableDataList(empid: any, month: string) {
    this.LoaderShow = true;
    this.NodataLable = false;
    this.BindData = [];
    if (empid === 'all') {
      empid = 0; // Assuming that passing 0 or some other value can fetch data for all employees
    }
    this.apiService.AdminGetSalaryGenerateEmpWise(empid, month).subscribe(
      (data) => {
        if (data.responseCode == 200) {
          this.BindData = data.data;
          this.Salary = this.BindData.reduce((acc: any, row: any) => acc + parseFloat(row.Salary), 0); // Calculate total salary
          this.LoaderShow = false;
          this.updateFooterSalary(); // Update footer with total salary
          this.showTable = true; // Show the table and the save button
          this.dateChanged = true; // Show the clear data button
        } else {
          this.NodataLable = true;
          this.LoaderShow = false;
          this.showTable = false; // Hide the table and the save button
          this.dateChanged = false; // Hide the clear data button
        }
      }, error => {
        this.toastrService.error('Something went Wrong', 'Error!');
        this.LoaderShow = false;
        this.showTable = false; // Hide the table and the save button in case of error
        this.dateChanged = false; // Hide the clear data button
      }
    );
  }

  updateFooterSalary() {
    setTimeout(() => {
      $('#table_data tfoot #total-salary').text(this.Salary); // Update the footer salary
    }, 0);
  }

  View(empid: Number, month: string): void {
    const modalRef = this.modalService.open(SalaryViewComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = empid;
    modalRef.componentInstance.monthname = month;
    modalRef.result.then((result) => {
      this.TableDataList(this.empid, this.month);
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  SearchData() {
    this.TableDataList(this.AllEmp, this.month);
    this.dateChanged = true;
    this.showTable = true;
  }

  // saveSalary() {
  //   this.isButtonsDisabled = true;
  //   this.apiService.AdminGetSalarySaveEmpWise(this.empid,this.month).subscribe(data => {
  //     debugger;
  //     if (data.responseCode == 200) {
  //       this.toastrService.success(data.responseMessage, 'Success');
  //     }
  //     else{
  //       this.toastrService.error(data.responseMessage, 'Invalid!');
  //     }
  //   }, (error) => {
  //     this.toastrService.error('Error fetching users', 'Error');
  //   });
  // }
  saveSalary() {
   
    this.isButtonsDisabled = true;
    this.apiService.AdminGetSalarySaveEmpWise(this.empid,this.month).subscribe(data => {
debugger;
//this.toastrService.error('Fail', 'Invalid');
//this.toastrService.error(data.responseMessage, 'Invalid!');
      if (data.responseCode == 200) {
        this.toastrService.success('Hello', 'Success');
        //this.toastrService.success(data.responseMessage, 'Success');
      } else {
      
        this.toastrService.error(data.responseMessage, 'Invalid!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    })
  }
  

  isSearchButtonEnabled(): boolean {
    return this.AllEmp !== 0 && this.month !== '';
  }

  clearData() {
    this.AllEmp = 0;  // Reset the employee dropdown to the placeholder
    this.month = '';  // Reset the month dropdown to the placeholder
    this.dateChanged = false;  // Reset the dateChanged flag

    this.EmpBind = [];  // Clear the employee data
    this.MonthData = [];  // Clear the month data

    this.Salary = 0;  // Reset the total salary to 0
    this.showTable = false;
    this.isButtonsDisabled = false; // Enable buttons again

    this.ngOnInit();  // Reinitialize the component
  }
}
