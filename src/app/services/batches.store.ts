import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable, throwError} from 'rxjs';
import {catchError, filter, map, shareReplay, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingService} from '../components/core/loading/loading.service';
import {BatchData, BatchInfo, BatchWrapper, sortBatchesByAddedDate} from '../model/batch';
import {MessagesService} from '../components/core/messages/messages.service';



@Injectable({
  providedIn: 'root'
})
export class BatchesStore {

  private subject = new BehaviorSubject<BatchWrapper[]>([]);
  private subjectStore = new BehaviorSubject<any[]>([]);

  batches$: Observable<BatchWrapper[]> = this.subject.asObservable();
  batchStore$: Observable<any[]> = this.subjectStore.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private loading: LoadingService,
    private messages: MessagesService) {
    this.loadAllBatches();
    this.loadBatchStore();

  }

  private loadAllBatches() {
    const loadBatches$ = this.firestore.collection('batches').valueChanges().pipe(
      map(response => {
        return response.
          filter((resp: BatchWrapper) => !resp.info.deletedAt);
      }),
      catchError(err => {
          const message = 'Nu am putut incarca loturile. Contacteaza-l pe Andrei soft.';
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
      tap((batches: BatchWrapper[]) => this.subject.next(batches))
    );
    this.loading.showLoaderUntilCompleted(loadBatches$)
      .subscribe();
  }

  private loadBatchStore() {
    const loadBatchStore$ = this.firestore.collection('batch-store').valueChanges().pipe(
      catchError(err => {
        const message = 'Nu am putut incarca magazia de date. Contacteaza-l pe Andrei soft.';
        this.messages.showErrors(message);
        console.log(message, err);
        return throwError(err);
      }),
      tap((store: any) => this.subjectStore.next(store))
    );
    this.loading.showLoaderUntilCompleted(loadBatchStore$)
      .subscribe();
  }
  saveStore(store) {
    const promise = this.firestore.collection('batch-store').doc('store').set(store);
    const saveBatch$ = from(promise);
    this.loading.showLoaderUntilCompleted(saveBatch$)
      .subscribe();
    return saveBatch$;
  }
  getSortedBatchesInfo(): Observable<BatchInfo[]> {
    return this.batches$
      .pipe(
        map(batches => {
          return batches.map((batch: BatchWrapper) => batch.info).sort(sortBatchesByAddedDate);
        })
      );
  }
  getBatchesData(): Observable<BatchData[]> {
    return this.batches$
      .pipe(
        map(batches => {
          return batches.map((batch: BatchWrapper) => batch.data);
        })
      );
  }
  getStore(): Observable<any> {
    return this.batchStore$;
  }
}
