import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable} from 'rxjs';
import {LoadingService} from '../components/core/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private firestore: AngularFirestore,
              private loading: LoadingService) { }

  saveHeader(header) {
    return this.firestore.collection('headers').add(header);
  }
  saveBatch(batch, date) {
    const promise = this.firestore.collection('batches').doc(date).set(batch);
    const saveBatch$ = from(promise);
    this.loading.showLoaderUntilCompleted(saveBatch$)
      .subscribe();
    return saveBatch$;
  }
  getHeader(): Observable<any> {
    return this.firestore.collection('headers').valueChanges();
  }
  markAsDelete(id) {
    const deletedAt = new Date().getTime().toString();
    const deletedBatch$ = from(this.firestore.collection('batches').doc(id).update({ 'info.deletedAt' : deletedAt}));
    this.loading.showLoaderUntilCompleted(deletedBatch$)
      .subscribe();
    return deletedBatch$;
  }
}

