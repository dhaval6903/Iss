import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-officenotes-add',
  templateUrl: './officenotes-add.component.html',
  styleUrl: './officenotes-add.component.css'
})
export class OfficenotesAddComponent {

  btndisable: boolean = false;
  BindData: any = '';

  
  n_id: number = 0;
  n_title: string = '';
  n_details: string = '';
  n_date: string = '';
  n_status: string = '';
  lable: string = "Add";



  
  @Input() editid: any;
 

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.n_id  = this.editid;
    if(this.n_id  > 0){
      this.lable = 'Edit';
      this.GetSingleOfficeNotesData(this.n_id);
    }
  
}


async onSubmit() 
{
  this.btndisable = true;
  debugger;
  this.APIService.AdminNotes(
      this.n_id,
      this.n_title,
      this.n_details,
      this.n_date,
      this.n_status
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


GetSingleOfficeNotesData(n_id: number) {
  this.APIService.AdminGetNotes(n_id).subscribe(data => {
    debugger;
    if (data.responseCode == 200) {
      this.n_id = data.data[0].n_id;
      this.n_title = data.data[0].n_title;
      this.n_details = data.data[0].n_details;
      this.n_date = data.data[0].n_date;
      this.n_status = data.data[0].n_status;
     

     
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
