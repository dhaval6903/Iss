import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salary-view',
  templateUrl: './salary-view.component.html',
  styleUrl: './salary-view.component.css'
})
export class SalaryViewComponent {

  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  empid: number = 0;
  month: string = '';


  @Input() editid: any;
  @Input() monthname: any;

  
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal,public router: Router, private http: HttpClient, private httpClient: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { } // Inject ApiService

  ngOnInit(): void {
    this.TableDataList(this.editid, this.monthname); // Fetch employee list on component initialization
    debugger;
  }

  TableDataList(empid:number, month:string){
    this.apiService.AdminGetAttendanceEmpWise(empid,month).subscribe(data => {
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

  closeModal(): void {
    this.activeModal.close();
  }

}
