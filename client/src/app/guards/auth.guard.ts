import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate , Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if(JSON.parse(localStorage.getItem('currentUser')).userRole === 'admin'){
  		return true;
  	}
  	return false;
  }
}
// export class loginGaurd implements CanActivate {
// 	constructor(private _router: Router){
// 	}
//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//   	var isLoggedIn = JSON.parse(localStorage.getItem('currentUser'));
//   	if(isLoggedIn){
//   		return true;
//   	}
//   	this._router.navigate(['login']);
//   	return false;
//   }
// }