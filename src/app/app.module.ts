import { NgModule } from '@angular/core';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppService } from './app.service'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeftbarComponent } from './include/leftbar/leftbar.component';
import { FooterComponent } from './include/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { ProjectAddComponent } from './project/project-add/project-add.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { AttendanceViewComponent } from './attendance/attendance-view/attendance-view.component';
import { AttendanceEditComponent } from './attendance/attendance-edit/attendance-edit.component';
import { AttendanceMapComponent } from './attendance/attendance-map/attendance-map.component';
import { ClientAddComponent } from './client/client-add/client-add.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { SalaryListComponent } from './salary/salary-list/salary-list.component';
import { SalaryViewComponent } from './salary/salary-view/salary-view.component';
import { TaskAddComponent } from './task/task-add/task-add.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskUpdateComponent } from './task/task-update/task-update.component';
import { TaskViewComponent } from './task/task-view/task-view.component';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { NgSelect2Module } from 'ng-select2';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';



// import { DoubleScrollComponent } from 'mindgaze-doublescroll';
// import 'mindgaze-doublescroll';




@NgModule({
  declarations: [
    AppComponent,
    LeftbarComponent,
    FooterComponent,
    HomeComponent,
    EmployeeAddComponent,
    EmployeeListComponent,
    ProjectAddComponent,
    ProjectListComponent,
    AttendanceViewComponent,
    ClientAddComponent,
    ClientListComponent,
    SalaryListComponent,    
    SalaryViewComponent,
    TaskAddComponent,
    TaskListComponent,
    TaskUpdateComponent,
    TaskViewComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    ProjectpaymentAddComponent,
    ProjectpaymentListComponent,
    StudentAddComponent,
    StudentListComponent,
    FeesAddComponent,
    FeesListComponent,
    OfficenotesAddComponent,
    OfficenotesListComponent,
    WalletAddComponent,
    WalletListComponent,
    CostAddComponent,
    CostListComponent,
    AttendanceEditComponent,
    AttendanceMapComponent

  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatIconModule,
    NgSelect2Module,
    MatButtonModule,
    // DoubleScrollComponent,
    FlexLayoutModule,
    FlexLayoutServerModule,
    HttpClientModule,
    CommonModule,
    NgSelectModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AppService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 