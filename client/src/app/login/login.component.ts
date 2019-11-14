import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm:FormGroup;
	isError : boolean = false;
	isDisable:boolean =false;
	errorMessage : any;
	constructor( 
		public _loginService: LoginService,
		private route: ActivatedRoute,
		private router: Router,
		) {
		if (this._loginService.currentUserValue) { 
			this.router.navigate(['/']);
		}

		this.loginForm = new FormGroup({
			email: new FormControl('', Validators.required),
			password:new FormControl('' , Validators.required)
		});
	}

	ngOnInit() {
	}
	get f() { return this.loginForm.controls; }

	login(value){
		this._loginService.loginUser(value).subscribe((response) => {
			console.log("successfull login"  , response);
			this.isDisable = false;
		this.isError = false;
			localStorage.setItem('currentUser', JSON.stringify(response));
			// this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			this.router.navigate(['']);
		} , (err) => {
			// Swal.fire({
			// 	title: 'Error!',
			// 	text: 'Do you want to continue',
			// 	type: 'error',
			// 	confirmButtonText: 'Cool'
			// });
			console.log(err.status)
			if(err.status == 400){
			this.errorMessage = "Check your Email/Password and try again";
			}else if(err.status == 404){
				this.errorMessage = "Please check out the connection and try again";
			}else if(err.status == 500){
				this.errorMessage = "We are sorry for it , try again after sometime";
			}
			this.isError = true;
			console.log("err in login " , err);
		})
		console.log(value);
	}
}
