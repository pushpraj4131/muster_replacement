import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatepickerModule,   BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FilterPipe} from './filter.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogsSummaryComponent } from './logs-summary/logs-summary.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { FilterPipe } from './filter.pipe';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TestingDatepickerComponent } from './testing-datepicker/testing-datepicker.component';
import { UserReportComponent } from './user-report/user-report.component';

import { setTheme } from 'ngx-bootstrap/utils';

setTheme('bs4'); // or 'bs4'
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LogsSummaryComponent,
    UserProfileComponent,
    LoginComponent,
    FilterPipe,
    AllUsersComponent,
    UserDetailComponent,
    TestingDatepickerComponent,
    UserReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() ,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
