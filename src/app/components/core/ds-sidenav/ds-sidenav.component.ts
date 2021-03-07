import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ds-sidenav',
  templateUrl: './ds-sidenav.component.html',
  styleUrls: ['./ds-sidenav.component.scss']
})
export class DsSidenavComponent implements OnDestroy, OnInit {

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              private _router: Router) {
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

  goToPage(url: string) {
    this._router.navigateByUrl(url);
  }
}
