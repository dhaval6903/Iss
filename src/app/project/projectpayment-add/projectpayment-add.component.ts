import { Component, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Select2OptionData } from 'ng-select2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Options } from 'select2';

@Component({
  selector: 'app-projectpayment-add',
  templateUrl: './projectpayment-add.component.html',
  styleUrls: ['./projectpayment-add.component.css']
})
export class ProjectpaymentAddComponent {

  public exampleData: Array<Select2OptionData> = [];

  @ViewChild("select2")
  ngSelectComponent!: NgSelectComponent;
  public options!: Options;

  btndisable: boolean = false;
  BindData: any = '';
  p_project: string = '';
  pp_amount: string = '';
  pp_date: string = '';
  pp_paymentmode: string = '';  
  p_remainingpayment: string = '';  
  pp_remark: string = '';
  remainingPayment: number = 0;

  pp_id: number = 0;
  p_id: number = 0;
  lable: string = "Add";

  isEdit: boolean = false;

  @Input() editid: any;

  constructor(
    public activeModal: NgbActiveModal,
    private APIService: ApiService, 
    public router: Router, 
    private toastrService: ToastrService, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.options = {
      width: '100%',
    };
    this.AdminGetProjectList();
    this.pp_id = this.editid;
    this.isEdit = this.pp_id > 0;
    if (this.isEdit) {
      this.lable = 'Edit';
      this.GetSingleProjectPaymentData(this.pp_id);
    }
  }

  AdminGetProjectList() {
    this.APIService.AdminGetProjectList(this.p_id).subscribe(data => {
     debugger;
      if (data.responseCode == 200) {
        this.BindData = data.data;
        debugger;
        let objTemp: any[] = [];
        for (var i = 0; i < this.BindData.length; i++) {
          let Obj = {
            id: this.BindData[i].p_id,
            text: this.BindData[i].p_title,
          }
          objTemp.push(Obj);
        }

        debugger;
        console.log(this.exampleData)
        this.exampleData = objTemp
      } else {
        this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    })
  }

  onProjectChange() {
    const selectedProject = this.BindData.find((project: any) => project.p_id === this.p_project);
    if (selectedProject) {
      this.remainingPayment = selectedProject.p_remainingpayment;
    } else {
      this.remainingPayment = 0;
    }
  }

  async onSubmit() {
    this.btndisable = true;

    this.APIService.AdminProjectPayment(
      this.pp_id,
      this.p_project,
      this.pp_amount,
      this.pp_date,
      this.pp_paymentmode,
      this.pp_remark
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

  GetSingleProjectPaymentData(pp_id: number) {
    this.APIService.AdminGetProjectPayment(pp_id).subscribe(data => {
      if (data.responseCode == 200) {
        const projectPaymentData = data.data[0];
        this.pp_id = projectPaymentData.pp_id;
        this.p_project = projectPaymentData.p_id;
        this.pp_amount = projectPaymentData.pp_amount;
        this.pp_date = projectPaymentData.pp_date;
        this.pp_paymentmode = projectPaymentData.pp_paymentmode;
        this.pp_remark = projectPaymentData.pp_remark;
        this.remainingPayment = projectPaymentData.p_remainingpayment;
      } else {
        this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    })
  }

  closeModal() {
    this.activeModal.close();
  }
}
