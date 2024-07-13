import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wallet-add',
  templateUrl: './wallet-add.component.html',
  styleUrl: './wallet-add.component.css'
})
export class WalletAddComponent {

  btndisable: boolean = false;
  BindData: any = '';

  
  w_id: number = 0;
  w_details: string = '';
  w_date: string = '';
  w_wallet: string = '';
  w_remark: string = '';
  w_status: string = '';
  w_type: string = '';
  lable: string = "Add";



  
  @Input() editid: any;
 

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.w_id  = this.editid;
    if(this.w_id  > 0){
      this.lable = 'Edit';
      this.GetSingleWalletData(this.w_id);
    }
  
}


async onSubmit() 
{
  this.btndisable = true;
  debugger;
  this.APIService.AdminWallet(
      this.w_id,
      this.w_details,
      this.w_date,
      this.w_wallet,
      this.w_remark,
      this.w_type,
      this.w_status
  ).subscribe(data => {
      if (data.responseCode == 200) {
          this.toastrService.success(data.responseMessage, 'Success');
          this.closeModal();
      } else {
          this.toastrService.error(data.responseMessage, 'Invalid!');
      }
      this.btndisable = false;
  }, error => {
      this.toastrService.error('Something went wrong!', 'Invalid!');
      this.btndisable = false;
  });
}


GetSingleWalletData(w_id: number) {
  this.APIService.AdminGetWallet(w_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.w_id = data.data[0].w_id;
      this.w_details = data.data[0].w_details;
      this.w_date = data.data[0].w_date;
      this.w_wallet = data.data[0].w_wallet;
      this.w_remark = data.data[0].w_remark;
      this.w_type = data.data[0].w_type;
      this.w_status = data.data[0].w_status;
      
 
    } else {
      this.toastrService.error(data.responseMessage, 'Error!');
    }
  }, error => {
    this.toastrService.error('Something went Wrong', 'Error!');
  })
}

  closeModal() {
    debugger;
    this.activeModal.close();
  }

}
