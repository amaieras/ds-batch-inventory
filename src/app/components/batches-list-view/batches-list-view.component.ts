import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BatchService} from '../../services/batch.service';
import {faExternalLinkSquareAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

export interface BatchData {
  addedDate: string;
  totalCost: string;
  totalItems: string;
  actions: string;
}

@Component({
  selector: 'app-batches-list-view',
  templateUrl: './batches-list-view.component.html',
  styleUrls: ['./batches-list-view.component.scss']
})
export class BatchesListViewComponent implements OnInit{
  faExternalLinkSquareAlt = faExternalLinkSquareAlt;
  faTrashAlt = faTrashAlt;
  displayedColumns: string[] = ['addedDate', 'totalCost', 'totalItems', 'actions'];
  dataSource: MatTableDataSource<BatchData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _batch: BatchService) {
  }

  ngOnInit(): void {
    this._batch.getBatches().subscribe(batches => {
      let arrBatches = [];
      batches.forEach(batch => {
        const obj = {
          addedDate: batch.sheet[0].addedDate,
          totalCost: batch.sheet[0].totalCost,
          totalItems: batch.sheet[0].totalItems,
          actions: batch.sheet[0].id
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
}

