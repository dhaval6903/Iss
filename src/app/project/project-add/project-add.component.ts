import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.css'
})
export class ProjectAddComponent {

  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;
  btndisable: boolean = false;
  BindData: any = '';

  p_title: string = '';
  p_startdate: string = '';
  p_budget: string = '';
  p_technology: string = '';
  cl_name: string = '';
  p_enddate: string = '';
  p_details: string = '';
  p_image: any;
  p_oldimg: any = '';
  p_status: string = '';
  

  cl_id: number = 0;
  p_id: number = 0;
  lable: string = "Add";

  @Input() editid: any;
 

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.AdminGetClientList();
    this.p_id  = this.editid;
    if(this.p_id  > 0){
      this.lable = 'Edit';
      this.GetSingleProjectData(this.p_id);
    }
  
}

AdminGetClientList() {
  this.APIService.AdminGetClientList(this.cl_id).subscribe(data => {
    if (data.responseCode == 200) {
      this.BindData = data.data;
    } else {
      this.toastrService.error(data.responseMessage, 'Error!');
    }
  }, error => {
    this.toastrService.error('Something went Wrong', 'Error!');
  })
}


async onSubmit() 
{
  this.btndisable = true;
  debugger;
  const p_image: File = this.imageInput.nativeElement.files[0];

  this.APIService.AdminProject(
      this.p_id,
      this.cl_name,
      this.p_title,
      this.p_startdate,
      this.p_budget,
      this.p_technology,
      this.p_enddate,
      this.p_details,
      this.p_status,
      p_image,
      this.p_oldimg
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


GetSingleProjectData(p_id: number) {
  this.APIService.AdminGetProject(p_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.p_id = data.data[0].p_id;
      this.cl_name = data.data[0].cl_id;
      this.p_title = data.data[0].p_title;
      this.p_startdate = data.data[0].p_startdate;
      this.p_budget = data.data[0].p_budget;
      this.p_technology = data.data[0].p_technology;
      this.p_enddate = data.data[0].p_enddate;
      this.p_details = data.data[0].p_details;
      this.p_status = data.data[0].p_status;
      this.p_image = data.data[0].p_image;
      
      this.p_oldimg = data.data[0].p_oldimg;
     

     
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
