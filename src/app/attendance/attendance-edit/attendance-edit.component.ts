import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendance-edit',
  templateUrl: './attendance-edit.component.html',
  styleUrls: ['./attendance-edit.component.css']
})
export class AttendanceEditComponent {
  btndisable: boolean = false;
  BindData: any = '';
  
  a_id: number = 0;
  a_attendancestatus: string = '';
  a_remark: string = '';

  
  @Input() editid: any;
  
  constructor(
    public activeModal: NgbActiveModal,
    private APIService: ApiService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    this.a_id = this.editid;
    if (this.a_id > 0) {
      this.GetSingleAttendanceData(this.a_id);
    }
  }
  
  async onSubmit() {
    this.btndisable = true;
    this.APIService.AdminAttendance(
      this.a_id,
      this.a_attendancestatus,
      this.a_remark
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
  
  GetSingleAttendanceData(a_id: number) {
    this.APIService.AdminGetAttendance(a_id).subscribe(data => {
      if (data.responseCode == 200) {
        this.a_id = data.data[0].a_id;
        this.a_attendancestatus = data.data[0].a_attendancestatus;
        this.a_remark = data.data[0].a_remark;
      } else {
        this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went wrong', 'Error!');
    });
  }
  
  closeModal() {
    this.activeModal.close();
  }
}
