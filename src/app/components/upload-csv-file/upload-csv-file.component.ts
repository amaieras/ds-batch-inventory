import { Component, OnInit } from '@angular/core';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import * as XLSX from 'xlsx';
import {UploadFileService} from '../../services/upload-file.service';
import {map} from 'rxjs/operators';
import {DsDialogMessageComponent} from '../core/ds-dialog-message/ds-dialog-message.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-upload-csv-file',
  templateUrl: './upload-csv-file.component.html',
  styleUrls: ['./upload-csv-file.component.scss']
})
export class UploadCsvFileComponent implements OnInit {

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private uploadFileService: UploadFileService,
    public dialog: MatDialog) { }
  csvRecords: any[] = [];
  header = false;

  arrayBuffer: any;
  ngOnInit(): void {
  }
  parseCsv(ev: Event) {
    // Select the files from the event
    // @ts-ignore
    const files = ev.target.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe((result: Array<any>) => {

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
      const header = this.parseDataForHeader(jsonData);
      this.saveHeader(header);

      this.uploadFileService.saveBatch({});

    };
    reader.readAsBinaryString(file);
  }

  saveHeader(headers) {
    const headerObj = {
      headers
    };
    this.uploadFileService.getHeader().pipe(
      map(h => h[0].headers)
    ).subscribe(existingHeader => {
      if (!existingHeader) {
        this.uploadFileService.saveHeader(headerObj).then(resp => {
          this.openDialog(existingHeader, 'Fiser salvat cu succes.');
        });
      } else {
        if (headerObj.headers.length === existingHeader.length &&
          existingHeader.every((value, index) => value === headerObj.headers[index])){

        } else {
          this.openDialog(existingHeader, 'Capul de tabel e diferit. Ar trebui sa arate asa:');
        }
      }

    });
  }

  openDialog(data, message) {

    const dataIn = {
      data,
      message
    };
    this.dialog.open(DsDialogMessageComponent,
      {
      data: dataIn
    });
  }

  private parseDataForHeader(jsonData): string[] {
    const headers = Object.keys(jsonData.Tabelle1[1]);
    headers[3] = 'Unit Cost';
    headers[4] = 'Total Unit Cost';

    return headers;
  }
}
