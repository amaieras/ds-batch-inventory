import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject,of} from 'rxjs';
import {concatMap, delay, finalize, tap} from 'rxjs/operators';
import {LoadingBarService} from '@ngx-loading-bar/core';


@Injectable()
export class LoadingService {

  public loader = this.loadingBar.useRef();

  constructor(private loadingBar: LoadingBarService) {}

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null)
      .pipe(
        tap(() => this.loadingOn()),
        finalize(() => this.loadingOff()),
        concatMap(() => obs$),
      );
  }

  loadingOn() {
    this.loader.start();
  }

  loadingOff() {
    this.loader.stop();

  }

}
