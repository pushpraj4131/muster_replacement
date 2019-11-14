import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import component
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogsSummaryComponent } from './logs-summary/logs-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
// import { loginGaurd } from './guards/auth.guard';
const routes: Routes = [
	{
		path:"app-component",
		component : AppComponent
	},
	{
		path:"",
		component : DashboardComponent
	},
	{
		path : 'logs-summary',
		component : LogsSummaryComponent
	},
	{
		path : 'user-profile',
		component : UserProfileComponent
	},
	{
		path : 'login',
		component : LoginComponent
		// canActivate: [loginGaurd]
	},
	{
		path : 'all-users',
		component : AllUsersComponent
	},
	{
		path : 'all-users/user-detail/:id',
		component : UserDetailComponent
	},
	{
		path : 'user-report',
		component : UserReportComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
