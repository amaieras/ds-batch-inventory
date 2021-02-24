import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSidenavComponent } from './ds-sidenav.component';

describe('DsSidenavComponent', () => {
  let component: DsSidenavComponent;
  let fixture: ComponentFixture<DsSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsSidenavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
