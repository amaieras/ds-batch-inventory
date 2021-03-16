import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchViewComponent } from './batch-list-view.component';

describe('BatchViewComponent', () => {
  let component: BatchViewComponent;
  let fixture: ComponentFixture<BatchViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
