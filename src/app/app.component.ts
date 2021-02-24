import {AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements AfterViewInit {
  title = 'ds-batch-inventory';


  constructor() {
  }

  ngAfterViewInit(): void {
  }

  titleClicked() {

  }
}

