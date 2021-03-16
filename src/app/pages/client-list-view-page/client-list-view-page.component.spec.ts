import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListViewPageComponent } from './client-list-view-page.component';

describe('ClientListViewPageComponent', () => {
  let component: ClientListViewPageComponent;
  let fixture: ComponentFixture<ClientListViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
