import {Component, OnInit} from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import {UploadFileService} from '../../services/upload-file.service';
import {finalize, first, map} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-csv-file',
  templateUrl: './upload-csv-file.component.html',
  styleUrls: ['./upload-csv-file.component.scss']
})
export class UploadCsvFileComponent implements OnInit {

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private _uploadFileService: UploadFileService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }
  csvRecords: any[] = [];
  header = false;

  arrayBuffer: any;
  mode: any = 'indeterminate';
  loading = false;
  ngOnInit(): void {
  }
  parseCsv(ev: Event) {
    // Select the files from the event
    // @ts-ignore
    const files = ev.target.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe(first()).subscribe((result: Array<any>) => {

      console.log('Result', result);

      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }
  parseXslx(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.saveHeader(jsonData, ev);

    };
    reader.readAsBinaryString(file);
  }

  saveHeader(jsonData, ev) {
    const headers = this.parseDataForHeader(jsonData);
    const headerObj = {
      headers
    };
    this.loading = true;
    this._uploadFileService.getHeader().pipe(
      first(),
      finalize(() => {
        ev.target.value = '';
        this.loading = false;
      }),
      map(h => h[0] ? h[0].headers : null)
    ).subscribe(existingHeader => {
      let message = '';
      if (!existingHeader) {
        this._uploadFileService.saveHeader(headerObj).then(() => {
          message = 'Fiser salvat cu succes. Si a fost adaugat un format de fisier.';
          this.saveData(jsonData, existingHeader, message);
        });
      } else {
        if (headerObj.headers.length === existingHeader.length &&
          existingHeader.every((value, index) => value === headerObj.headers[index])){
          message = 'Fiser salvat cu succes.';
          this.saveData(jsonData, existingHeader, message);
        } else {
          message = 'Capul de tabel e diferit. Ar trebui sa arate asa:';
          this.openDialog(null, message);
        }
      }
    });
  }

  openDialog(data, message) {
    this._snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

  private parseDataForHeader(jsonData): string[] {
    const headers = Object.keys(jsonData.Tabelle1[1]);
    headers[0] = headers[0] === 'Artikel' ? 'id' : 'Artikel';
    headers[1] = headers[1] === 'Bezeichnung' ? 'model' : 'Bezeichnung';
    headers[2] = headers[2] === 'Menge' ? 'quantity' : 'Menge';
    headers[3] = 'unitCost';
    headers[4] = 'totalUnitCost';

    return headers;
  }

  private saveData(jsonData, existingHeader, message) {
    const mappedData = jsonData.Tabelle1
      .map((item, index) => {
        if (index === 0) {
          return {
            totalItems: jsonData.Tabelle1[0].Menge,
            totalCost: jsonData.Tabelle1[0].__EMPTY_1,
            addedDate: new Date().getTime().toString()
          };
        } else {
          return {
            id: item.Artikel,
            model: item.Bezeichnung,
            quantity: item.Menge,
            unitCost: item.__EMPTY,
            totalUnitCost: item.__EMPTY_1
          };
        }
    });

    const finalObj = {
      sheet: mappedData
    };

    this._uploadFileService.saveBatch(finalObj).pipe
    (
      first()
    ).subscribe(() => this.openDialog(existingHeader, message));
  }
}
