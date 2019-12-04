import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
// import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js'

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
	loginFlag: boolean = false;
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
		this.checkIp();
	}
	get f() { return this.loginForm.controls; }

	login(value){
		this._loginService.loginUser(value , this.loginFlag).subscribe((response) => {
			console.log("successfull login"  , response);
			this.isDisable = false;
			this.isError = false;
			localStorage.setItem('currentUser', JSON.stringify(response));
			// this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
			this.router.navigate(['']);
		} , (err) => {
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
	checkIp(){
		this._loginService.getIpCliente().subscribe((response)=>{
			console.log("this --------------> ",response);
		},(err)=>{
			if(err.error.text == '119.160.195.171' || err.error.text == '27.57.190.69' || err.error.text == '27.54.180.182 '){
				this.loginFlag = true;
				alert(err.error.text + " --> Valid IP");	
			}
			else{	
				this.loginFlag = false;
				alert(err.error.text + " ---> Invalid IP");
			}
		});
	}
}
