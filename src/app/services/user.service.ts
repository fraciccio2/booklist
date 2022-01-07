import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: any){
    let name=localStorage.getItem('name');
    this.db.object('/users/' +user.uid).update({
      name: user.displayName || name,
      email: user.email
    })
  }

  get(uid: string): Observable<any>{
    return this.db.object('/users/' + uid).valueChanges();
  }
}
