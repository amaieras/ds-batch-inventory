import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-ds-sidenav',
  templateUrl: './ds-sidenav.component.html',
  styleUrls: ['./ds-sidenav.component.scss']
})
export class DsSidenavComponent implements OnDestroy, OnInit {




  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }
  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

}
