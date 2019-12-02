import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _http: HttpClient) { }
  getAllUsers(){
  	var body = {
  		'branch' : localStorage.getItem('branchSelected')
  	}
  	return this._http.post( config.baseApiUrl+"user/get-users" , body);	
  }
  getUserById(id){
  	return this._http.get( config.baseApiUrl+"user/get-user-by-id/"+id );	
  }
}
