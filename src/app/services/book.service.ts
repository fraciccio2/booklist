import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private db: AngularFireDatabase) { }

  create(book: any, uid: string){
    return this.db.list('/books/' +uid).push(book);
  }

  delete(uid: string, key: string){
    return this.db.object('/books/' +uid +'/' +key).remove();
  }

  update(book: any, uid: string, key: string){
    return this.db.object('/books/' +uid +'/' +key).update(book);
  }

  getBooks(uid: string){
    return this.db.list('/books/' +uid).snapshotChanges();
  }

  getBook(uid: string, key: string){
    return this.db.object('/books/' +uid +'/' +key).valueChanges();
  }
}
