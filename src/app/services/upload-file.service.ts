import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private firestore: AngularFirestore) { }

  saveHeader(header) {
    return this.firestore.collection('headers').add(header);
  }
  saveBatch(batch, date) {
    const promise = this.firestore.collection('batches').doc(date).set(batch);
    return from(promise);
  }
  getHeader(): Observable<any> {
    return this.firestore.collection('headers').valueChanges();
  }
}
