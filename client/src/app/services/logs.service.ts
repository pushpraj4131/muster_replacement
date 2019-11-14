import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { config } from '../config'; 

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(public _http: HttpClient) { }

  getCurrentDateLogById(){
  	console.log(" Into the service ");
  	var body = {
  		userId : JSON.parse(localStorage.getItem('currentUser'))._id
  	}
    console.log(body);
  	return this._http.post( config.baseApiUrl+"attendance/get-attendance-by-id" , body);	
  }
  fillAttendance(){
  	var body = {
  		userId : JSON.parse(localStorage.getItem('currentUser'))._id
  	}
    console.log(body);
  	return this._http.post( config.baseApiUrl+"attendance/fill-attendance" , body);	
  }
  getLastFiveDaysAttendance(id){
    if(id == 0){
      var body = {
        userId : JSON.parse(localStorage.getItem('currentUser'))._id,
        days : '5'
      }
    }else{
       var body = {
        userId : id,
        days : '5'
      } 
    }
    console.log(body);
    return this._http.post( config.baseApiUrl+"attendance/get-last-five-days-logs" , body);  
  } 
  /*Services called from logs-summary*/
  getLogsCountByMonthDefault(){
    var body = {}
    body['userId'] = JSON.parse(localStorage.getItem('currentUser'))._id;
    return this._http.post(config.baseApiUrl+"attendance/get-current-month-logs-count" , body);      
  }
  getLogsByMonthDefaultByPage(body){
    if(JSON.parse(localStorage.getItem('currentUser')).userRole ){
      body['userRole'] = JSON.parse(localStorage.getItem('currentUser')).userRole;
    }
    body['userId'] = JSON.parse(localStorage.getItem('currentUser'))._id;
    return this._http.post( config.baseApiUrl+"attendance/get-current-month-logs-by-page" , body);      
  }
  getLogsReportById(body){
    console.log(body);
    return this._http.post( config.baseApiUrl+"attendance/get-report-by-id" , body);      
  }

  //admin functions
  getTodaysAttendance(){
    return this._http.get( config.baseApiUrl+"attendance/get-todays-day-logs");
    // sdjfklsjdlkjfklsdf
    // ksldflksjdlkfjlksd
    // ksdlfkjsdkljfklsd
    // klsdfjklsd
  }
  getLogsBySingleDate(data){
    console.log(data);
    return this._http.post(config.baseApiUrl+"attendance/get-logs-by-single-date" , data);
  }
  getReportFlagWise(body){
    console.log(body);
    return this._http.post( config.baseApiUrl+"attendance/get-report-by-flag" , body);
  }

}
