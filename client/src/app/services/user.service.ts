import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _http: HttpClient) { }
  getAllUsers(){
  	return this._http.get( config.baseApiUrl+"user/get-users");	
  }
  getUserById(id){
  	return this._http.get( config.baseApiUrl+"user/get-user-by-id/"+id );	
  }
}
