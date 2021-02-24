import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDialogMessageComponent } from './ds-dialog-message.component';

describe('DsDialogMessageComponent', () => {
  let component: DsDialogMessageComponent;
  let fixture: ComponentFixture<DsDialogMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsDialogMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsDialogMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
