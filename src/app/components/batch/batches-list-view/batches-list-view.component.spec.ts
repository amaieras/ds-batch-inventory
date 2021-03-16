import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchesListViewComponent } from './batches-list-view.component';

describe('BatchesListViewComponent', () => {
  let component: BatchesListViewComponent;
  let fixture: ComponentFixture<BatchesListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchesListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchesListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
