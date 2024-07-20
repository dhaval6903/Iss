import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AttendanceMapComponent } from '../../attendance/attendance-map/attendance-map.component';

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
  empfullname: string = '';
  empcontact : string = '';


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
        this.empfullname = this.BindData[0].emp_fristname +' '+ this.BindData[0].emp_lastname;
        this.empcontact = this.BindData[0].emp_contact;
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

  Map(att_latitudeIN: number, att_longitudeIN: number, att_latitudeOUT: number, att_longitudeOUT: number): void {
    const modalRef = this.modalService.open(AttendanceMapComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.att_latitudeIN = att_latitudeIN;
    modalRef.componentInstance.att_longitudeIN = att_longitudeIN;
    modalRef.componentInstance.att_latitudeOUT = att_latitudeOUT;
    modalRef.componentInstance.att_longitudeOUT = att_longitudeOUT;
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
