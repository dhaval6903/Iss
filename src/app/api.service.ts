import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule , HttpHeaders, HttpParams , HttpResponse } from '@angular/common/http';

import { environment } from '../environments/environment';
import { catchError, map } from 'rxjs';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

export interface ApiResponse {
  status: boolean;
  responseCode: number;
  responseMessage: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = environment.baseURL;

  
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
  Formheaders = new HttpHeaders()
    .set('content-type', 'multipart/form-data; boundary=----WebKitFormBoundaryWmt0le2BezUauhxg')
    .set('Accept', 'application/json');



  constructor(private http: HttpClient, private fb: FormBuilder, private httpClient: HttpClient,) { }



  AdminEmpLogin(username: string, password:string) {
    var APIURL = this.baseURL+ 'AdminEmpLogin';
    //debugger;

    const formData = new FormData();
    formData.append('username', username.toString());
    formData.append('password', password.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetEmp(empid: number) {
    const APIURL = this.baseURL + 'AdminGetEmp';

    const formData = new FormData();
    formData.append('empid', empid.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetAttendanceMonth() {
    const APIURL = this.baseURL + 'AdminGetAttendanceMonth';

    const formData = new FormData();
    // formData.append('empid', empid.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetAttendanceEmpWise(empid: number,  month: string) {
    var APIURL = this.baseURL+ 'AdminGetAttendanceEmpWise';
    debugger;
    const formData = new FormData();
    formData.append('empid', empid.toString());
    formData.append('month', month.toString());
    debugger;
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetSalaryGenerateEmpWise(empid: number,  month: string) {
    var APIURL = this.baseURL+ 'AdminGetSalaryGenerateEmpWise';
    debugger;
    const formData = new FormData();
    formData.append('empid', empid.toString());
    formData.append('month', month.toString());
    debugger;
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetSalarySaveEmpWise(empid: number,  month: string) {
    var APIURL = this.baseURL+ 'AdminGetSalarySaveEmpWise';
    debugger;
    const formData = new FormData();
    formData.append('empid', empid.toString());
    formData.append('month', month.toString());
    debugger;
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminAddEmp(emp_fristname: string, emp_lastname: string, emp_email: string,emp_adress: string,emp_contact: string,emp_secondcontact: string,emp_designation: string,emp_position: string,emp_password: string,emp_status: string,emp_image: any,emp_resume: any) {
    var APIURL = this.baseURL+ 'AdminAddEmp';
    debugger;
    const formData = new FormData();
    formData.append('emp_fristname', emp_fristname.toString());
    formData.append('emp_lastname', emp_lastname.toString());
    formData.append('emp_email', emp_email.toString());
    formData.append('emp_adress', emp_adress.toString());
    formData.append('emp_contact', emp_contact.toString());
    formData.append('emp_secondcontact', emp_secondcontact.toString());
    formData.append('emp_designation', emp_designation.toString());
    formData.append('emp_position', emp_position.toString());
    formData.append('emp_password', emp_password.toString());
    formData.append('emp_status', emp_status.toString());
    
    formData.append('emp_image', emp_image, emp_image.name);
    formData.append('emp_resume', emp_resume, emp_resume.name);

    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminEmpDelete(emp_id: number) {
    var APIURL = this.baseURL+ 'AdminEmpDelete';
    debugger;
    const formData = new FormData();
    formData.append('empid', emp_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminEditEmp(
    emp_id: number,emp_fristname: string,emp_lastname: string,emp_email: string, emp_adress: string,emp_contact: string,emp_secondcontact: string,emp_designation: string,emp_position: string,emp_password: string,emp_status: string,emp_image: any,emp_resume: any,emp_oldimg: any,emp_oldresume: any) {
    const APIURL = this.baseURL + 'AdminEditEmp';
    debugger;
    const formData = new FormData();
    formData.append('emp_id', emp_id.toString());
    formData.append('emp_fristname', emp_fristname.toString());
    formData.append('emp_lastname', emp_lastname.toString());
    formData.append('emp_email', emp_email.toString());
    formData.append('emp_adress', emp_adress.toString());
    formData.append('emp_contact', emp_contact.toString());
    formData.append('emp_secondcontact', emp_secondcontact.toString());
    formData.append('emp_designation', emp_designation.toString());
    formData.append('emp_position', emp_position.toString());
    formData.append('emp_password', emp_password.toString());
    formData.append('emp_status', emp_status.toString());
    formData.append('emp_oldimg', emp_oldimg.toString());
    formData.append('emp_oldresume', emp_oldresume.toString());
    
    // Append old image if new image is not provided
    if (emp_image) {
      formData.append('emp_image', emp_image, emp_image.name);
    } else  {
      formData.append('emp_image', '');
    }
  
    // Append old resume if new resume is not provided
    if (emp_resume) {
      formData.append('emp_resume', emp_resume, emp_resume.name);
    } else   {
      formData.append('emp_resume', '');
    }
  
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetProject(p_id: number) {
    const APIURL = this.baseURL + 'AdminGetProject';

    const formData = new FormData();
    formData.append('p_id', p_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminProject(p_id: number,cl_name:string,p_title: string, p_startdate: string, p_budget: string,p_technology:string,p_enddate: string,p_details: string,p_status: string,p_image: any,p_oldimg: any) {
    var APIURL = this.baseURL+ 'AdminProject';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('p_id', p_id.toString());
    formData.append('cl_id', cl_name.toString());
    formData.append('p_title', p_title.toString());
    formData.append('p_startdate', p_startdate.toString());
    formData.append('p_budget', p_budget.toString());
    formData.append('p_technology', p_technology.toString());
    formData.append('p_enddate', p_enddate.toString());
    formData.append('p_details', p_details.toString());
    formData.append('p_status', p_status.toString());
    formData.append('p_oldimg', p_oldimg.toString());
    
    
    // Append old image if new image is not provided
    if (p_image) {
      formData.append('p_image', p_image, p_image.name);
    } else  {
      formData.append('p_image', '');
    }
    

    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminProjectDelete(p_id: number) {
    var APIURL = this.baseURL+ 'AdminProjectDelete';
    debugger;
    const formData = new FormData();
    formData.append('p_id', p_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetProjectPayment(pp_id: number) {
    const APIURL = this.baseURL + 'AdminGetProjectPayment';

    const formData = new FormData();
    formData.append('pp_id', pp_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetProjectList(p_id: number) {
    const APIURL = this.baseURL + 'AdminGetProjectList';
    debugger;

    const formData = new FormData();
    formData.append('p_id', p_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminProjectPayment(pp_id:number,p_project: string, pp_amount: string, pp_date: string,pp_paymentmode:string,pp_remark:string) {
    var APIURL = this.baseURL+ 'AdminProjectPayment';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('pp_id', pp_id.toString());
    formData.append('p_id', p_project.toString());
    formData.append('pp_amount', pp_amount.toString());
    formData.append('pp_date', pp_date.toString());
    formData.append('pp_paymentmode', pp_paymentmode.toString());
    formData.append('pp_remark', pp_remark.toString());
    

    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminProjectPaymentDelete(pp_id: number) {
    var APIURL = this.baseURL+ 'AdminProjectPaymentDelete';
    debugger;
    const formData = new FormData();
    formData.append('pp_id', pp_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }



  AdminGetClient(cl_id: number) {
    const APIURL = this.baseURL + 'AdminGetClient';

    const formData = new FormData();
    formData.append('cl_id', cl_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminClient(cl_id:number,cl_name: string, cl_business: string, cl_email: string,cl_phone:string,cl_address:string,cl_status:string) {
    var APIURL = this.baseURL+ 'AdminClient';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('cl_id', cl_id.toString());
    formData.append('cl_name', cl_name.toString());
    formData.append('cl_business', cl_business.toString());
    formData.append('cl_email', cl_email.toString());
    formData.append('cl_phone', cl_phone.toString());
    formData.append('cl_address', cl_address.toString());
    formData.append('cl_status', cl_status.toString());
    

    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminClientDelete(cl_id: number) {
    var APIURL = this.baseURL+ 'AdminClientDelete';
    debugger;
    const formData = new FormData();
    formData.append('cl_id', cl_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetClientList(cl_id: number) {
    const APIURL = this.baseURL + 'AdminGetClientList';
    debugger;

    const formData = new FormData();
    formData.append('cl_id', cl_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }



  AdminGetStudent (std_id: number) {
    const APIURL = this.baseURL + 'AdminGetStudent';
    debugger;

    const formData = new FormData();
    formData.append('std_id', std_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminStudent(std_id:number,std_name: string, std_project: string, std_contact: string,std_familycontact:string,std_subject:string,std_totalfees:string,std_address:string,std_college:string,std_status:string,std_remark:string,std_inquiry:string,std_year:string) {
    var APIURL = this.baseURL+ 'AdminStudent';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('std_id', std_id.toString());
    formData.append('std_name', std_name.toString());
    formData.append('std_project', std_project.toString());
    formData.append('std_contact', std_contact.toString());
    formData.append('std_familycontact', std_familycontact.toString());
    formData.append('std_subject', std_subject.toString());
    formData.append('std_totalfees', std_totalfees.toString());
    formData.append('std_address', std_address.toString());
    formData.append('std_college', std_college.toString());
    formData.append('std_status', std_status.toString());
    formData.append('std_remark', std_remark.toString());
    formData.append('std_inquiry', std_inquiry.toString());
    formData.append('std_year', std_year.toString());
    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminStudentDelete(std_id: number) {
    var APIURL = this.baseURL+ 'AdminStudentDelete';
    debugger;
    const formData = new FormData();
    formData.append('std_id', std_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }



  AdminGetFees(f_id: number) {
    const APIURL = this.baseURL + 'AdminGetFees';
    debugger;

    const formData = new FormData();
    formData.append('f_id', f_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminFees(f_id:number,std_name:string,f_fees: string, f_date: string, f_mode: string,f_remark:string) {
    var APIURL = this.baseURL+ 'AdminFees';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('f_id', f_id.toString());
    formData.append('std_id', std_name.toString());
    formData.append('f_fees', f_fees.toString());
    formData.append('f_date', f_date.toString());
    formData.append('f_mode', f_mode.toString());
    formData.append('f_remark', f_remark.toString());
    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetStudentList(std_id: number) {
    const APIURL = this.baseURL + 'AdminGetStudentList';
    debugger;

    const formData = new FormData();
    formData.append('std_id', std_id.toString());
debugger;
    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminFeesDelete(f_id: number) {
    var APIURL = this.baseURL+ 'AdminFeesDelete';
    debugger;
    const formData = new FormData();
    formData.append('f_id', f_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetNotes(n_id: number) {
    const APIURL = this.baseURL + 'AdminGetNotes';
    debugger;

    const formData = new FormData();
    formData.append('n_id', n_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminNotes(n_id:number,n_title:string,n_details: string, n_date: string, n_status: string) {
    var APIURL = this.baseURL+ 'AdminNotes';
    debugger;
    const formData = new FormData();
    // formData.append('p_id', p_id.toString());
    formData.append('n_id', n_id.toString());
    formData.append('n_title', n_title.toString());
    formData.append('n_details', n_details.toString());
    formData.append('n_date', n_date.toString());
    formData.append('n_status', n_status.toString());
    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminNotesDelete(n_id: number) {
    var APIURL = this.baseURL+ 'AdminNotesDelete';
    debugger;
    const formData = new FormData();
    formData.append('n_id', n_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminGetWallet(w_id: number) {
    const APIURL = this.baseURL + 'AdminGetWallet';
    debugger;

    const formData = new FormData();
    formData.append('w_id', w_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminWallet(w_id:number,w_details:string,w_date: string, w_wallet: string, w_remark: string, w_type:string, w_status:string) {
    var APIURL = this.baseURL+ 'AdminWallet';
    debugger;
    const formData = new FormData();
    formData.append('w_id', w_id.toString());
    formData.append('w_details', w_details.toString());
    formData.append('w_date', w_date.toString());
    formData.append('w_wallet', w_wallet.toString());
    formData.append('w_remark', w_remark.toString());
    formData.append('w_type', w_type.toString());
    formData.append('w_status', w_status.toString());
    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }

  AdminWalletDelete(w_id: number) {
    var APIURL = this.baseURL+ 'AdminWalletDelete';
    debugger;
    const formData = new FormData();
    formData.append('w_id', w_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetCost(cost_id: number) {
    const APIURL = this.baseURL + 'AdminGetCost';
    debugger;

    const formData = new FormData();
    formData.append('cost_id', cost_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }



  AdminCost(cost_id:number, cost_type:string, cost_description: string, cost_date: string, cost_amount: string, cost_payby:string, cost_remark:string, cost_status:string) {
    var APIURL = this.baseURL+ 'AdminCost';
    debugger;
    const formData = new FormData();
    formData.append('cost_id', cost_id.toString());
    formData.append('cost_type', cost_type.toString());
    formData.append('cost_description', cost_description.toString());
    formData.append('cost_date', cost_date.toString());
    formData.append('cost_amount', cost_amount.toString());
    formData.append('cost_payby', cost_payby.toString());
    formData.append('cost_remark', cost_remark.toString());
    formData.append('cost_status', cost_status.toString());
    debugger;
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminCostDelete(cost_id: number) {
    var APIURL = this.baseURL+ 'AdminCostDelete';
    debugger;
    const formData = new FormData();
    formData.append('cost_id', cost_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminGetAttendance(a_id: number) {
    const APIURL = this.baseURL + 'AdminGetAttendance';
    debugger;

    const formData = new FormData();
    formData.append('a_id', a_id.toString());

    return this.httpClient.post(APIURL, formData)
     .pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminAttendance(a_id:number, a_attendancestatus:string, a_remark: string) {
    var APIURL = this.baseURL+ 'AdminAttendance';
    debugger;
    const formData = new FormData();
    formData.append('a_id', a_id.toString());
    formData.append('a_attendancestatus', a_attendancestatus.toString());
    formData.append('a_remark', a_remark.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }


  AdminAttendanceDelete(a_id: number) {
    var APIURL = this.baseURL+ 'AdminAttendanceDelete';
    debugger;
    const formData = new FormData();
    formData.append('a_id', a_id.toString());
    
    return this.httpClient.post(APIURL, formData).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      );
  }





  
}