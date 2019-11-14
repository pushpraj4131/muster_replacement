import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FilterPipe } from '../filter.pipe';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-all-users',
	templateUrl: './all-users.component.html',
	styleUrls: ['./all-users.component.css'],
	providers: [FilterPipe]
})
export class AllUsersComponent implements OnInit {
	userInfo : any;
	allUsers : any;
	totalUsers : any;
	fromSearchedItems : any;
	modelValue: any;
	constructor(
			public _userService: UserService,
			public _filterPipe: FilterPipe,
			private route: ActivatedRoute,
			private router: Router,
			private _loginService: LoginService
		) { }

	ngOnInit() {
		this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
		this.getAllUsers();
	}
	getAllUsers(){
		this._userService.getAllUsers().subscribe((res: any)=>{
			this.allUsers = res;
			this.totalUsers = res.length;
			const data =  res;
			this.fromSearchedItems = data; 
			console.log("res of getAllUsers in all user component " , res);
		} , (err)=>{
			console.log("err of getAllUsers in all user component " , err);
		});
	}
	searchByName(items){
		var field1 = (<HTMLInputElement>document.getElementById("nameSearch")).value;
		this.allUsers = this._filterPipe.transform(items, field1);
	}
	getUserDetail(userId){
		console.log("user id => " ,userId);
		this.router.navigate(['all-users/user-detail/' + userId]);
	}
	logout() {
		console.log("logiut ccalled");
		this._loginService.logout();
		this.router.navigate(['login']);
	}
}
