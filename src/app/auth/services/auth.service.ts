import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, catchError, map, of } from 'rxjs';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  profile = new BehaviorSubject<Profile | null>(null);

  constructor(private httpClient: HttpClient) { }

  getProfile() {
    return this.httpClient.get<Profile>('api/auth/profile')
      .pipe(
        map((value) => {
          this.profile.next(value);
          return value;
        }),
        catchError(() => of(null)),
      );
  }

  login(loginRequest: LoginRequest) {
    const httpParams = new HttpParams({
      fromObject: { ...loginRequest }
    });
    return this.httpClient.post<Profile>('api/auth/login', httpParams)
      .pipe(
        map((value) => this.profile.next(value)),
      );
  }

  logout() {
    return this.httpClient.post('api/auth/logout', undefined)
      .pipe(
        map(() => this.profile.next(null)),
      );
  }
}
