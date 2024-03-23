import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from '../../share/models';
import { ApiEndpoints } from '../config';


@Injectable({
  providedIn: 'root'
 })
 export class LoginService {
  url  : any = environment.apiUrls.baseApiUrl;
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
  return this.http.post(this.url + ApiEndpoints.Auth.Login, user,httpOptions);
   }

   changePassword(data : any) : Observable<any>{
    return this.http.post<any>(this.url + ApiEndpoints.Auth.UpdatePassword, data)
  }
  
  forgotPassword(data:any){
    return this.http.post<any>(this.url + ApiEndpoints.Auth.ForgotPassword, data)
  }
  resetPassword(data:any,id:string){
    return this.http.put<any>(this.url + ApiEndpoints.Auth.ResetPassword +  '/' + id, data)
  }
  signUp(data:any){
    return this.http.post<any>(this.url + ApiEndpoints.Auth.SignUp, data)
  }
  logout(id:any){
    return this.http.post<any>(this.url + ApiEndpoints.Auth.Logout +  '/' + id, '')
  }

  createUserProfile(id?:string,data?:any){
    return this.http.put<any>(this.url + ApiEndpoints.Users.CreateProfile + '/' + id, data)
  }
}
