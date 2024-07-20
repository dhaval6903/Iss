import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
import { SalaryViewComponent } from '../salary-view/salary-view.component';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrl: './salary-list.component.css'
})
export class SalaryListComponent implements OnInit{

  
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
  Salary: number = 0;

  
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

  TableDataList(empid: any, month: string) {
    this.LoaderShow = true;
    this.NodataLable = false; 
    this.BindData = []; 
    if(empid === 'all') {
      empid = 0; // Assuming that passing 0 or some other value can fetch data for all employees
    }
    this.apiService.AdminGetSalaryGenerateEmpWise(empid, month).subscribe(
      (data) => {
        if (data.responseCode == 200) {
          this.BindData = data.data; 
          this.Salary = this.BindData.reduce((acc: any, row: any) => acc + parseFloat(row.Salary), 0); // Calculate total salary
          this.LoaderShow = false; 
          this.updateFooterSalary(); // Update footer with total salary
        } else {
          this.NodataLable = true; 
          this.LoaderShow = false; 
        }
      }, error => {
        this.toastrService.error('Something went Wrong', 'Error!');
      }
    );
  }
  
  updateFooterSalary() {
    setTimeout(() => {
      $('#table_data tfoot #total-salary').text(this.Salary); // Update the footer salary
    }, 0);
  }
  



    View(empid: Number, month:string): void {
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

    this.Salary = 0;  // Reset the total salary to 0
  
    this.ngOnInit();  // Reinitialize the component
  }

  

  

  


}
