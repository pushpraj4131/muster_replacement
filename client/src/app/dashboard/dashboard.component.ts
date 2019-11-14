import { Component, OnInit , Output , Input , ViewEncapsulation} from '@angular/core';
import { LogsService } from '../services/logs.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from '../filter.pipe';
import { EventEmitter } from '@angular/core';
import * as moment from 'moment';

// RTCPeerConnection' does not exist on type 'Window'
declare var $;
interface window {
	RTCPeerConnection : any ;
	mozRTCPeerConnection : any ;
	webkitRTCPeerConnection : any
}
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [FilterPipe]
})
export class DashboardComponent implements OnInit {
	modelValue : any;
	attendanceFlag: any ; 
	userInfo ;
	filledAttendanceLog ;
	entry : any;
	exit : any ;
	fiveDaysLogs : any;
	//admin variables
	todaysAttendance : any
	filteredData = [];
	totalUsers : any ;
	presentCount : any;
	p: number = 1;
	@Output() notifyParent: EventEmitter<any> = new EventEmitter();
	constructor(public _logService: LogsService , private route: ActivatedRoute,
		private router: Router , public _loginService: LoginService , public _filterPipe: FilterPipe) { }

	ngOnInit() {

		this.getUserIP(function(ip){
			console.log(ip)
		});
		var hello ;
		var self = this;
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip();   
		});
		this.userInfo = JSON.parse(localStorage.getItem("currentUser"));
		this.notifyParent.emit(this.userInfo);
		if(!this.userInfo){
			this.router.navigate(['/login']);
		}
		//admin functions
		this.getTodaysAttendance();
		//employees functions
		if(this.userInfo.userRole != 'admin'){
			this.getLastFiveDaysAttendance();
			this.getCurrentDateLogById();

		}
	}
	getCurrentDateLogById(){
		this._logService.getCurrentDateLogById().subscribe((response:any) => {
			console.log("response of getCurrentDateLogById ===>" , response);
			if(response.length){
				this.filledAttendanceLog = this.properFormatDate(response);
				// this.filledAttendanceLog = response;

				var timeLogLength = this.filledAttendanceLog[0].timeLog.length - 1;
				console.log(timeLogLength);
				var lastRecord = this.filledAttendanceLog[0].timeLog[timeLogLength].out;
				if(lastRecord != '-'){
					this.exit = this.filledAttendanceLog[0].timeLog[timeLogLength].out; 
					this.entry = false;
				}else{
					this.entry = this.filledAttendanceLog[0].timeLog[timeLogLength].in; 
					this.exit = false;
				}

			}	
		}, (err)=>{
			console.log("error of getCurrentDateLogById ===>" , err);
		});
	}
	fillAttendance(){
		this._logService.fillAttendance().subscribe((response) =>{
			console.log("response ====>" , response);
			this.filledAttendanceLog = this.properFormatDate(response);
			this.filledAttendanceLog=this.filledAttendanceLog.reverse();  
			var flag = 0;
			this.fiveDaysLogs.filter((data)=>{
				if(data.date == this.filledAttendanceLog[0].date){
				console.log(data.date , this.filledAttendanceLog[0].date)
					flag = 1;
				}
			});
			if(flag == 0){
				this.fiveDaysLogs.unshift(this.filledAttendanceLog[0]);
			}else{
				this.fiveDaysLogs[0] = this.filledAttendanceLog[0];
			}
			var timeLogLength = this.filledAttendanceLog[0].timeLog.length - 1;
			console.log(timeLogLength);
			var lastRecord = this.filledAttendanceLog[0].timeLog[timeLogLength].out;
			if(lastRecord != '-'){
				this.exit = this.filledAttendanceLog[0].timeLog[timeLogLength].out; 
				this.entry = false;
			}else{
				this.entry = this.filledAttendanceLog[0].timeLog[timeLogLength].in; 
				this.exit = false;
			}
		} , (err) =>{
			console.log("err ===>" , err);
		})
	}
	getLastFiveDaysAttendance(){
		var id = 0;
		this._logService.getLastFiveDaysAttendance(id).subscribe((response:any) => {
			console.log("last five days response" , response);
			this.fiveDaysLogs = this.properFormatDate(response.foundLogs);
			this.fiveDaysLogs = this.fiveDaysLogs.reverse();  

			// this.fiveDaysLogs = response;
		} ,(err) => {
			console.log("last five days error" , err);
		});
	}
	logout() {
		console.log("logiut ccalled");
		this._loginService.logout();
		this.router.navigate(['login']);
	}
	openModel(index){
		console.log("hey" , index);
		if(!this.userInfo.userRole || this.userInfo.userRole == 'employee')
			this.modelValue = this.fiveDaysLogs[index];
		else{
			console.log("this.todaysAttendance in else ====>" , this.todaysAttendance);
			this.modelValue = this.todaysAttendance[index];
		}
		console.log(this.modelValue);
		$('#myModal').modal('show');


	}

	//admin functionalities
	getTodaysAttendance(){
		this._logService.getTodaysAttendance().subscribe((response:any) => {
			console.log('getTodaysAttendance response'  , response);
			this.presentCount = response.presentCount;
			this.totalUsers = response.totalUser;
			this.todaysAttendance = this.properFormatDate(response.data);
			// this.todaysAttendance = response.data;
			const data = JSON.stringify(this.todaysAttendance);
			this.filteredData = JSON.parse(data);
		} , (err) => {
			console.log('getTodaysAttendance error'  , err);
		})	
	}
	searchByName(items){
		var field1 = (<HTMLInputElement>document.getElementById("nameSearch1")).value;
		console.log(field1)
		this.todaysAttendance = this._filterPipe.transform(items, field1);
	}
	


	getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    	//compatibility for firefox and chrome
    	// console.log("onNewIP" , onNewIP);
    	// (<any>window).mozRTCPeerConnection 
    	var myPeerConnection = (<any>window).RTCPeerConnection || (<any>window).mozRTCPeerConnection  || (<any>window).webkitRTCPeerConnection;
    	var pc = new myPeerConnection({
    		iceServers: []
    	}),
    	noop = function() {},
    	localIPs = {},
    	ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    	key;

    	function iterateIP(ip) {
    		if (!localIPs[ip]) onNewIP(ip);
    		localIPs[ip] = true;
    	}

     //create a bogus data channel
     pc.createDataChannel("");

	    // create offer and set local description
	    pc.createOffer(function(sdp) {
	    	sdp.sdp.split('\n').forEach(function(line) {
	    		if (line.indexOf('candidate') < 0) return;
	    		line.match(ipRegex).forEach(iterateIP);
	    	});

	    	pc.setLocalDescription(sdp, noop, noop);
	    }, noop); 

	    //listen for candidate events
	    pc.onicecandidate = function(ice) {
	    	if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
	    	ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
	    };
	}
	properFormatDate(data){
		return data = data.filter((obj)=>{
			return obj.date = moment(obj.date).utc().format("DD/MM/YYYY");

		});
	}
}
