import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, filter, map, shareReplay, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingService} from '../components/core/loading/loading.service';
import {Batch, sortBatchesByAddedDate} from '../model/batch';
import {MessagesService} from '../components/core/messages/messages.service';


@Injectable({
  providedIn: 'root'
})
export class BatchesStore {

  private subject = new BehaviorSubject<Batch[]>([]);

  batches$: Observable<Batch[]> = this.subject.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private loading: LoadingService,
    private messages: MessagesService) {
    this.loadAllBatches();

  }

  private loadAllBatches() {
    const loadBatches$ = this.firestore.collection('batches').valueChanges().pipe(
      map(response => {
        return response.
          filter(resp => !resp.info.deletedAt)
          .map(resp => resp.info);
      }),
      catchError(err => {
          const message = 'Nu am putut incarca loturile. Contacteaza-l pe Andrei soft.';
          this.messages.showErrors(message);
          console.log(message, err);
          return throwError(err);
        }),
      tap(batches => this.subject.next(batches))
    );
    this.loading.showLoaderUntilCompleted(loadBatches$)
      .subscribe();
  }
  getSortedBatches(): Observable<Batch[]> {
    return this.batches$
      .pipe(
        map(batches => {
          return batches.sort(sortBatchesByAddedDate);
        })
      );
  }

}
