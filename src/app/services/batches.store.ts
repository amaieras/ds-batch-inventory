import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay, tap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {LoadingService} from '../components/core/loading/loading.service';
import {Batch, sortBatchesByAddedDate} from '../model/batch';


@Injectable({
  providedIn: 'root'
})
export class BatchesStore {

  private subject = new BehaviorSubject<Batch[]>([]);

  batches$: Observable<Batch[]> = this.subject.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private loading: LoadingService) {
    this.loadAllBatches();

  }

  private loadAllBatches() {
    const loadBatches$ = this.firestore.collection('batches').valueChanges().pipe(
      map(response => response.map(resp => resp["sheet"])),
      catchError(err => {
        const message = 'Could not load batches';
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
        map(batches => batches.sort(sortBatchesByAddedDate))
      );
  }

}
