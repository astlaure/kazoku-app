import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  profileLoaded = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.profileLoaded) {
      return this.authService.profile ? true : this.router.createUrlTree(['/login']);
    }

    return this.authService.getProfile()
      .pipe(
        map((value) => {
          this.profileLoaded = true;
          return value ? true : this.router.createUrlTree(['/login']);
        }),
      );
  }

}
