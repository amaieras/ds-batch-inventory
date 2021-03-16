import {Component, OnInit, ViewChild} from '@angular/core';
import {ClientService} from '../../../../services/client.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-client-list-view',
  templateUrl: './client-list-view.component.html',
  styleUrls: ['./client-list-view.component.scss']
})
export class ClientListViewComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['addedDate', 'phone', 'quantity', 'username'];


  constructor(private _clientService: ClientService) { }

  ngOnInit(): void {
    this._clientService.getClients().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
