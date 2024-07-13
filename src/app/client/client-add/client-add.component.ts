import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.css'
})
export class ClientAddComponent {

  btndisable: boolean = false;

  lable: string = "Add";
  cl_id: number = 0;

  cl_name: string = '';
  cl_business: string = '';
  cl_email: string = '';
  cl_phone: string = '';
  cl_address: string = '';
  cl_status: string = '';

  @Input() editid: any;


  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }


  ngOnInit() {
    
    this.cl_id  = this.editid;
    if(this.cl_id  > 0){
      this.lable = 'Edit';
      this.GetSingleClientData(this.cl_id);
    }
  
}

async onSubmit() 
{
  this.btndisable = true;
  debugger;
  this.APIService.AdminClient(
      this.cl_id,
      this.cl_name,
      this.cl_business,
      this.cl_email,
      this.cl_phone,
      this.cl_address,
      this.cl_status
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

GetSingleClientData(cl_id: number) {
  this.APIService.AdminGetClient(cl_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.cl_id = data.data[0].cl_id;
      this.cl_name = data.data[0].cl_name;
      this.cl_business = data.data[0].cl_business;
      this.cl_email = data.data[0].cl_email;
      this.cl_phone = data.data[0].cl_phone;
      this.cl_address = data.data[0].cl_address;
      this.cl_status = data.data[0].cl_status;
      
     
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
