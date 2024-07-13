import { Component, Input, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Select2OptionData } from 'ng-select2';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Options } from 'select2';
@Component({
  selector: 'app-fees-add',
  templateUrl: './fees-add.component.html',
  styleUrl: './fees-add.component.css'
})
export class FeesAddComponent {

  public exampleData1: Array<Select2OptionData> = [];
  @ViewChild("select2")
  ngSelectComponent!: NgSelectComponent;
  public options!: Options;

  btndisable: boolean = false;
  BindData: any = '';

  
  f_id: number = 0;
  f_fees: string = '';
  f_date: string = '';
  f_mode: string = '';
  f_remark: string = '';
  f_status: string = '';
  lable: string = "Add";

  isEdit: boolean = false;

  remainingFees: number = 0;

  std_id: number = 0;
  std_name: string = '';

  
  @Input() editid: any;
 

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.options = {
      width: '100%',
    };
    this.AdminGetStudentList();
    this.f_id  = this.editid;
    this.isEdit = this.f_id > 0;
    if (this.isEdit) {
      this.lable = 'Edit';
      this.GetSingleFeesData(this.f_id);
    }
  
}

AdminGetStudentList() {
  this.APIService.AdminGetStudentList(this.std_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.BindData = data.data;
debugger;
      let objTemp1: any[] = [];
      for (var i = 0; i < this.BindData.length; i++) {
        let Obj1 = {
          id: this.BindData[i].std_id,
          text: this.BindData[i].std_name + ' | '+ this.BindData[i].std_year,
          // text: this.BindData[i].std_name,
        }
        objTemp1.push(Obj1);
      }
      debugger;
      console.log(objTemp1)
      this.exampleData1 = objTemp1



    } else {
      this.toastrService.error(data.responseMessage, 'Error!');
    }
  }, error => {
    this.toastrService.error('Something went Wrong', 'Error!');
  })
}

onStudentChange() {
  const selectedStudent = this.BindData.find((project: any) => project.std_id === this.std_name);
  if (selectedStudent) {
    this.remainingFees = selectedStudent.std_remainingfees;
  } else {
    this.remainingFees = 0;
  }
}


async onSubmit() 
{
  this.btndisable = true;
  debugger;
  this.APIService.AdminFees(
      this.f_id,
      this.std_name,
      this.f_fees,
      this.f_date,
      this.f_mode,
      this.f_remark
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


GetSingleFeesData(f_id: number) {
  this.APIService.AdminGetFees(f_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.f_id = data.data[0].f_id;
      this.std_name = data.data[0].std_id;
      this.f_fees = data.data[0].f_fees;
      this.f_date = data.data[0].f_date;
      this.f_mode = data.data[0].f_mode;
      this.f_remark = data.data[0].f_remark;
      this.f_status = data.data[0].f_status;
      this.remainingFees = data.data[0].std_remainingfees;
     

     
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
