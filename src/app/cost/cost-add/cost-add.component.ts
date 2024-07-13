import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cost-add',
  templateUrl: './cost-add.component.html',
  styleUrl: './cost-add.component.css'
})
export class CostAddComponent {
  btndisable: boolean = false;
  BindData: any = '';

  
  cost_id: number = 0;
  cost_type: string = '';
  cost_description: string = '';
  cost_date: string = '';
  cost_amount: string = '';
  cost_payby: string = '';
  cost_status: string = '';
  cost_remark: string = '';
  lable: string = "Add";



  
  @Input() editid: any;
 

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cost_id  = this.editid;
    if(this.cost_id  > 0){
      this.lable = 'Edit';
      this.GetSingleCostData(this.cost_id);
    }
  
}


async onSubmit() 
{
  this.btndisable = true;
  debugger;
  this.APIService.AdminCost(
      this.cost_id,
      this.cost_type,
      this.cost_description,
      this.cost_date,
      this.cost_amount,
      this.cost_payby,
      this.cost_status,
      this.cost_remark
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


GetSingleCostData(cost_id: number) {
  this.APIService.AdminGetCost(cost_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.cost_id = data.data[0].cost_id;
      this.cost_type = data.data[0].cost_type;
      this.cost_description = data.data[0].cost_description;
      this.cost_date = data.data[0].cost_date;
      this.cost_amount = data.data[0].cost_amount;
      this.cost_payby = data.data[0].cost_payby;
      this.cost_status = data.data[0].cost_status;
      this.cost_remark = data.data[0].cost_remark;
      
 
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
