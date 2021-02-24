import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

class DialogData {
}

@Component({
  selector: 'app-ds-dialog-message',
  templateUrl: './ds-dialog-message.component.html',
  styleUrls: ['./ds-dialog-message.component.scss']
})
export class DsDialogMessageComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit(): void {
    console.log(this.data)
  }

}
