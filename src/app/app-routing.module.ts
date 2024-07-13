import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';

import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectListComponent } from './project/project-list/project-list.component';

import { ProjectpaymentAddComponent } from './project/projectpayment-add/projectpayment-add.component';
import { ProjectpaymentListComponent } from './project/projectpayment-list/projectpayment-list.component';

import { StudentAddComponent } from './student/student-add/student-add.component';
import { StudentListComponent } from './student/student-list/student-list.component';

import { FeesAddComponent } from './fees/fees-add/fees-add.component';
import { FeesListComponent } from './fees/fees-list/fees-list.component';

import { OfficenotesAddComponent } from './officenotes/officenotes-add/officenotes-add.component';
import { OfficenotesListComponent } from './officenotes/officenotes-list/officenotes-list.component';

import { WalletAddComponent } from './wallet/wallet-add/wallet-add.component';
import { WalletListComponent } from './wallet/wallet-list/wallet-list.component';

import { CostAddComponent } from './cost/cost-add/cost-add.component';
import { CostListComponent } from './cost/cost-list/cost-list.component';

import { AttendanceViewComponent } from './attendance/attendance-view/attendance-view.component';
import { AttendanceEditComponent } from './attendance/attendance-edit/attendance-edit.component';
import { AttendanceMapComponent } from './attendance/attendance-map/attendance-map.component';

import { ClientAddComponent } from './client/client-add/client-add.component';
import { ClientListComponent } from './client/client-list/client-list.component';

import { SalaryAddComponent } from './salary/salary-add/salary-add.component';
import { SalaryListComponent } from './salary/salary-list/salary-list.component';

import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskUpdateComponent } from './task/task-update/task-update.component';
// Import other components if needed

const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'changepassword', component: ChangepasswordComponent},

  { path: 'forgotpassword', component: ForgotpasswordComponent},
 
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  // { path: '**', redirectTo: 'Home' },

  { path: 'employee/employee-list', component: EmployeeListComponent },
  { path: 'employee/employee-add/:id', component: EmployeeAddComponent },
  { path: 'employee/employee-edit/:id', component: EmployeeAddComponent },

  { path: 'project/project-list', component: ProjectListComponent },
  { path: 'project/project-add/:id', component: ProjectAddComponent },
  { path: 'project/project-edit/:id', component: ProjectAddComponent },

  { path: 'project/projectpayment-list', component: ProjectpaymentListComponent },
  { path: 'project/projectpayment-add/:id', component: ProjectpaymentAddComponent },
  { path: 'project/projectpayment-edit/:id', component: ProjectpaymentAddComponent },

  { path: 'student/student-list', component: StudentListComponent },
  { path: 'student/student-add/:id', component: StudentAddComponent },
  { path: 'student/student-edit/:id', component: StudentAddComponent },

  { path: 'fees/fees-list', component: FeesListComponent },
  { path: 'fees/fees-add/:id', component: FeesAddComponent },
  { path: 'fees/fees-edit/:id', component: FeesAddComponent },

  { path: 'officenotes/officenotes-list', component: OfficenotesListComponent },
  { path: 'officenotes/officenotes-add/:id', component: OfficenotesAddComponent },
  { path: 'officenotes/officenotes-edit/:id', component: OfficenotesAddComponent },

  { path: 'wallet/wallet-list', component: WalletListComponent },
  { path: 'wallet/wallet-add/:id', component: WalletAddComponent },
  { path: 'wallet/wallet-edit/:id', component: WalletAddComponent },

  { path: 'cost/cost-list', component: CostListComponent },
  { path: 'cost/cost-add/:id', component: CostAddComponent },
  { path: 'cost/cost-edit/:id', component: CostAddComponent },

  { path: 'attendance/attendance-view', component: AttendanceViewComponent },
  { path: 'attendance/attendance-edit/:id', component: AttendanceEditComponent },
  { path: 'attendance/attendance-map/:id', component: AttendanceMapComponent },

  { path: 'client/client-list', component: ClientListComponent },
  { path: 'client/client-add/:id', component: ClientAddComponent },
  { path: 'client/client-edit/:id', component: ClientAddComponent },

  { path: 'salary/salary-list', component: SalaryListComponent },
  { path: 'salary/salary-add/:id', component: SalaryAddComponent },
  { path: 'salary/salary-edit/:id', component: SalaryAddComponent },


  { path: 'task/task-list', component: TaskListComponent },
  { path: 'task/task-add/:id', component: TaskAddComponent },
  { path: 'task/task-edit/:id', component: TaskAddComponent },
  { path: 'task/task-update', component: TaskUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
