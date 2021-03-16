import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {LoadingService} from '../components/core/loading/loading.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private db: AngularFirestore,
              private loading: LoadingService) { }

  saveHeader(header) {
    return this.db.collection('headers').add(header);
  }
  saveBatch(batch, date) {
    const promise = this.db.collection('batches').doc(date).set(batch);
    const saveBatch$ = from(promise);
    this.loading.showLoaderUntilCompleted(saveBatch$)
      .subscribe();
    return saveBatch$;
  }

  getHeader(): Observable<any> {
    return this.db.collection('headers').valueChanges();
  }
  markAsDelete(id) {
    const deletedAt = new Date().getTime().toString();
    const deletedBatch$ = from(this.db.collection('batches').doc(id).update({ 'info.deletedAt' : deletedAt}));
    this.loading.showLoaderUntilCompleted(deletedBatch$)
      .subscribe();
    return deletedBatch$;
  }
  getBatchById(batchId) {
   const promise = this.db.collection('batches').doc(batchId).ref.get();
   return from(promise);
  }
}

