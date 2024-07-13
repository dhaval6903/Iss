import { Component, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

interface Option {
  name: string;
  value: string;
}

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css'] // Corrected from `styleUrl`
})
export class StudentAddComponent {
  btndisable: boolean = false;

  std_name: string = '';
  std_project: string = '';
  std_contact: string = '';
  std_familycontact: string = '';
  std_subject: string = '';
  std_totalfees: string = '';
  std_remainingfees: string = '';
  std_address: string = '';
  std_college: string = '';
  std_status: string = '';
  std_remark: string = '';
  std_inquiry: string = '';
  std_year: string = '';

  std_id: number = 0;
  lable: string = 'Add';

  @Input() editid: any; // Input property to receive data to edit

  options: Option[] = [
    {
      name: 'std_inquiry',
      value: 'Yes'
    },
    {
      name: 'std_inquiry',
      value: 'No'
    }
  ];

  constructor(
    public activeModal: NgbActiveModal,
    private APIService: ApiService,
    public router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.std_id = this.editid;
    if (this.std_id > 0) {
      this.lable = 'Edit';
      this.GetSingleStudentData(this.std_id);
    }
  }

  async onSubmit() {
    this.btndisable = true;
    this.APIService.AdminStudent(
      this.std_id,
      this.std_name,
      this.std_project,
      this.std_contact,
      this.std_familycontact,
      this.std_subject,
      this.std_totalfees,
      this.std_address,
      this.std_college,
      this.std_status,
      this.std_remark,
      this.std_inquiry,
      this.std_year
    ).subscribe(
      data => {
        if (data.responseCode == 200) {
          this.toastrService.success(data.responseMessage, 'Success');
          this.closeModal();
        } else {
          this.toastrService.error(data.responseMessage, 'Invalid!');
        }
        this.btndisable = false;
      },
      error => {
        this.toastrService.error('Something went wrong!', 'Invalid!');
        this.btndisable = false;
      }
    );
  }

  onRadioChange(opt: Option) {
    this.std_inquiry = opt.value;
    console.log(`Value is: ${opt.value}`);
  }

  GetSingleStudentData(std_id: number) {
    this.APIService.AdminGetStudent(std_id).subscribe(
      data => {
        debugger;
        if (data.responseCode == 200) {
          this.std_id = data.data[0].std_id;
          this.std_name = data.data[0].std_name;
          this.std_project = data.data[0].std_project;
          this.std_contact = data.data[0].std_contact;
          this.std_familycontact = data.data[0].std_familycontact;
          this.std_subject = data.data[0].std_subject;
          this.std_totalfees = data.data[0].std_totalfees;
          this.std_remainingfees = data.data[0].std_remainingfees;
          this.std_address = data.data[0].std_address;
          this.std_college = data.data[0].std_college;
          this.std_status = data.data[0].std_status;
          this.std_remark = data.data[0].std_remark;
          this.std_inquiry = data.data[0].std_inquiry;
          this.std_year = data.data[0].std_year;
        } else {
          this.toastrService.error(data.responseMessage, 'Error!');
        }
      },
      error => {
        this.toastrService.error('Something went wrong', 'Error!');
      }
    );
  }

  closeModal(): void {
    this.activeModal.close();
  }
}
