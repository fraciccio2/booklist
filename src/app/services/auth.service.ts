import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users$: any;

  constructor(private afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute) {
    this.users$=afAuth.authState;
   }

  login(){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginEP(email: string, password: string){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signEP(email: string, password: string){
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout(){
    this.afAuth.signOut();
  }

  get appUser$(): Observable<any> {
    return this.users$
      .pipe(
        switchMap((user: any) => {
          if (user) return this.userService.get(user.uid);

          return of(null);
        })
      );    
  }
}

