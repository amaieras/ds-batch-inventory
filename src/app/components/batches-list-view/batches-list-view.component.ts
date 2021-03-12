import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {faExternalLinkSquareAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Batch} from '../../model/batch';
import {BatchesStore} from '../../services/batches.store';
import {BatchService} from '../../services/batch.service';

@Component({
  selector: 'app-batches-list-view',
  templateUrl: './batches-list-view.component.html',
  styleUrls: ['./batches-list-view.component.scss']
})
export class BatchesListViewComponent implements OnInit, OnDestroy {
  faExternalLinkSquareAlt = faExternalLinkSquareAlt;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['addedDate', 'totalCost', 'totalItems', 'actions'];
  dataSource: MatTableDataSource<Batch>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // used to unsubscribe multiple subscriptions
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private _batchStore: BatchesStore,
              private _batchService: BatchService) {
  }

  ngOnDestroy(): void {
    // unsubscribe to all subscriptions
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }

  ngOnInit(): void {
    this._batchStore.getSortedBatches().pipe(
      takeUntil(this.unsubscribeSignal.asObservable())
    ).subscribe((batches: Batch[]) => {
      let arrBatches = [];
      batches.forEach(batch => {
        const obj = {
          addedDate: batch[0].addedDate,
          totalCost: batch[0].totalCost,
          totalItems: batch[0].totalItems,
          actions: ''
        };
        arrBatches = arrBatches.concat([obj]);
      });
      this.dataSource = new MatTableDataSource(arrBatches);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteBatch(batch) {
    this._batchService.deleteBatch(batch.addedDate);
  }
}

