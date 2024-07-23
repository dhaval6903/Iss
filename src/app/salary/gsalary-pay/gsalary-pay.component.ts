import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gsalary-pay',
  templateUrl: './gsalary-pay.component.html',
  styleUrls: ['./gsalary-pay.component.css']
})
export class GsalaryPayComponent implements OnInit {

  BindData: any;
  LoaderShow: boolean = true;
  NodataLable: boolean = false;
  empfullname: string = '';
  empcontact: string = '';
  Remarks: string = ''; // Add this property
  payAmount: string = ''; // Add this property

  @Input() editid!: number;
  @Input() monthname!: string;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, public router: Router, private http: HttpClient, private apiService: ApiService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.TableDataList();
  }

  TableDataList() {
    this.apiService.AdminGetSalarySavedData(this.editid, this.monthname).subscribe(data => {
      if (data.responseCode == 200) {
        this.BindData = data.data;
        if (this.BindData.length > 0) {
          this.empfullname = this.BindData[0].sa_fullname;
          this.empcontact = this.BindData[0].sa_contact;
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

  closeModal(): void {
    this.activeModal.close();
  }

  // submitForm(): void {
  //   const formData = {
  //     remark: this.remark,
  //     payAmount: this.payAmount
  //   };
    
  //   this.apiService.submitSalaryData(formData).subscribe(response => {
  //     if (response.responseCode == 200) {
  //       this.toastrService.success('Data submitted successfully', 'Success!');
  //       this.closeModal();
  //     } else {
  //       this.toastrService.error('Submission failed', 'Error!');
  //     }
  //   }, error => {
  //     this.toastrService.error('Something went wrong', 'Error!');
  //   });
  // }
  // }
  async onSubmit() {
  //   try {

  //     if(this.IsActive == 'Cancel'){
  //       this.IsActive = false;
  //     }
  
  //     debugger;
  //     const data = await this.APIService.RecieptUpdate(this.SaleReceipt, this.IsActive, this.Remarks, this.CancelRemarks, this.ActionDate).toPromise();
  //       if (data.response.statusCode == 1) {
  //         this.toastrService.success(data.response.message, 'Success');
  //         if(this.Agentid == 0){
  //           this.router.navigate(['/receiptActive']);
  //         }else{
  //           this.router.navigate(['/allsale/details', this.SaleId,this.Agentid]);
  //         }
          
  //       }else{
  //         this.toastrService.error(data.response.message, 'Invalid!');
  //       }
      
  //   } catch (error) {
  //     this.toastrService.error('Something went Wrong', 'Error!');
  //   }
  // }
}
}
