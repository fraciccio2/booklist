import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      return this.auth.users$.pipe(map((user: any)=>{
        if(user) return true;
        else{
          this.router.navigate(['/log-in'], {queryParams: { returnUrl: state.url}});
          return false;
        }
      }))
  }
}
