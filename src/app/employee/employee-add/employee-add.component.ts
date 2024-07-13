import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {

  @ViewChild('imageInput', { static: false }) imageInput!: ElementRef;
  @ViewChild('resumeInput', { static: false }) resumeInput!: ElementRef;
  btndisable: boolean = false;

  emp_fristname: string = '';
  emp_lastname: string = '';
  emp_email: string = '';
  emp_adress: string = '';
  emp_contact: string = '';
  emp_secondcontact: string = '';
  emp_designation: string = '';
  emp_position: string = '';
  emp_username: string = '';
  emp_password: string = '';
  emp_status: string = '';
  emp_image: any;
  emp_oldresume: any;
  emp_oldimg: any;
  emp_resume: any;

  empId: number = 0;
  emp_id: number = 0;
  lable: string = "Add";
  passwordVisible: boolean = false;
  passwordFieldType: string = 'password';

  @Input() editid: any; // Input property to receive data to edit

  constructor(public activeModal: NgbActiveModal,private APIService: ApiService, public router: Router, private toastrService: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    
      this.empId  = this.editid;
      if(this.empId  > 0){
        this.lable = 'Edit';
        this.GetSingleEmployeeData(this.empId);
      }
    
  }

  async onSubmit() {
    this.btndisable = true;
    debugger;
    
    if(this.empId == 0){
      const emp_image: File = this.imageInput.nativeElement.files[0];
      const emp_resume: File = this.resumeInput.nativeElement.files[0];
      this.APIService.AdminAddEmp(this.emp_fristname,this.emp_lastname,this.emp_email,this.emp_adress,this.emp_contact,this.emp_secondcontact,this.emp_designation,this.emp_position,this.emp_password ,this.emp_status, emp_image, emp_resume).subscribe(data => {
        debugger;
        if (data.responseCode == 200) {
          debugger;
          this.toastrService.success(data.responseMessage, 'Success');
          this.closeModal();
          //this.router.navigate(['/employee/employee-list']);
        } else {
          this.toastrService.error(data.responseMessage, 'Invalid!');
        }
        this.btndisable = false;
      }, error => {
        this.toastrService.error('', 'Invalid!');
      });
    }else{

      // edit function
      const emp_image: File = this.imageInput.nativeElement.files[0];
      const emp_resume: File = this.resumeInput.nativeElement.files[0];
      debugger;
      this.APIService.AdminEditEmp(this.empId,this.emp_fristname,this.emp_lastname,this.emp_email,this.emp_adress,this.emp_contact,this.emp_secondcontact,this.emp_designation,this.emp_position,this.emp_password ,this.emp_status, emp_image,emp_resume,this.emp_oldimg,this.emp_oldresume).subscribe(data => {
        debugger;
        if (data.responseCode == 200) {
          debugger;
          this.toastrService.success(data.responseMessage, 'Success');
          this.closeModal();
          //this.router.navigate(['/employee/employee-list']);
        } else {
          this.toastrService.error(data.responseMessage, 'Invalid!');
        }
        this.btndisable = false;
      }, error => {
        this.toastrService.error('', 'Invalid!');
      });


    }

  }


  GetSingleEmployeeData(empid: number) {
    this.APIService.AdminGetEmp(empid).subscribe(data => {
      debugger;
      if (data.responseCode == 200) {
        this.emp_id = data.data[0].emp_id;
        this.emp_fristname = data.data[0].emp_fristname;
        this.emp_lastname = data.data[0].emp_lastname;
        this.emp_contact = data.data[0].emp_contact;
        this.emp_email = data.data[0].emp_email;
        this.emp_adress = data.data[0].emp_adress;
        this.emp_secondcontact = data.data[0].emp_secondcontact;
        this.emp_designation = data.data[0].emp_designation;
        this.emp_position = data.data[0].emp_position;
        this.emp_username = data.data[0].emp_username;
        this.emp_password = data.data[0].emp_password;
        this.emp_status = data.data[0].emp_status;
        this.emp_image = data.data[0].emp_image;
        this.emp_resume = data.data[0].emp_resume;
        this.emp_oldimg = data.data[0].emp_oldimg;
        this.emp_oldresume = data.data[0].emp_oldresume;
      } else {
        this.toastrService.error(data.responseMessage, 'Error!');
      }
    }, error => {
      this.toastrService.error('Something went Wrong', 'Error!');
    })
  }

 
  closeModal(): void {
    this.activeModal.close();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

}
