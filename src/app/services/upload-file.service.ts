import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private firestore: AngularFirestore) { }

  saveHeader(header) {
    return this.firestore.collection('headers').add(header);
  }
  saveBatch(batch) {
    const date = new Date().getTime().toString();
    return this.firestore.collection('batches').doc(date).set({name: date});
  }
  getHeader(): Observable<any> {
    return this.firestore.collection('headers').valueChanges();
  }
}
