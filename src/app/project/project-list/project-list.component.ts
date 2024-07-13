import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2'; 
import { ProjectAddComponent } from '../project-add/project-add.component';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NumberSymbol } from '@angular/common';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {

  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  p_id: number = 0;

  
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
  DeleteProject(p_id: number): void {
    this.showAlert(
      'Are You Sure, You want to Delete this Data?',
    ).then((result: SweetAlertResult<any>) => {
      if (result.isConfirmed) {
        this.apiService.AdminProjectDelete(p_id).subscribe(
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

  openEditProjectForm(p_id: Number): void {
    const modalRef = this.modalService.open(ProjectAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = p_id;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
    });
  }

  openAddProjectForm(): void {
    const modalRef = this.modalService.open(ProjectAddComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    modalRef.componentInstance.editid = 0;
    modalRef.result.then((result) => {
      this.TableDataList();
    }, (reason) => {
      // Handle modal dismiss event if needed
      this.ngOnInit();
    });
  }

  TableDataList(){
    this.apiService.AdminGetProject(this.p_id).subscribe(data => {
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

  openImage(logoUrl: string): void {
    window.open(logoUrl, '_blank');
  }



}
