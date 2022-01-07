import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private fStorage: AngularFireStorage) { }

  saveImage(name: string, file: File){
    return this.fStorage.upload(name, file);
  }

  url(name: string){
    const fileRef = this.fStorage.ref(name);
    return fileRef;
  }
}
