import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  private _url = environment.api;

  getToken(username: string , password: string): Observable<any> {
    return this._http.post(`${this._url}/auth/login`, {
      email: username,
      password: password
    });
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('token');
      localStorage.removeItem('name_user');
    }
  }

  getUserName(): string {
    if (typeof window !== 'undefined' && localStorage) {
      const username = localStorage.getItem('name_user');
      if (username) {
        return username.split('@')[0];
      }
    }
    return 'Usuario';
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' && localStorage && !!localStorage.getItem('token');
  }
}
