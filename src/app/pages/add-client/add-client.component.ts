import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import { map, startWith, takeUntil} from 'rxjs/operators';
import {BatchService} from '../../services/batch.service';
import {formatDate} from '@angular/common';
import {BatchesStore} from '../../services/batches.store';
import {Batch} from '../../model/batch';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  batchOptions: string[] = [];
  filteredBatchOptions: Observable<string[]>;
  // used to unsubscribe multiple subscriptions
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private _batchStore: BatchesStore,
              private _batchService: BatchService) { }

  ngOnInit(): void {
    this.initForm();
    this.initBatchList();

  }
  private _filter(options, value: string): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  save(user) {
    if (this.formGroup.status === 'VALID') {
      console.log(user);
    }
  }

  private handleUsersFilter() {
    this.filteredOptions = this.formGroup.controls.username.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.options, value))
      );
    this.filteredBatchOptions = this.formGroup.controls.batch.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.batchOptions, value))
      );
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      batch: [null, [Validators.required]]
    });
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required') ? 'Field is required' : '';
  }

  private initBatchList() {
    this._batchStore.getSortedBatches().pipe(
      takeUntil(this.unsubscribeSignal.asObservable())
    ).subscribe((batches: Batch[]) => {
      this.batchOptions = batches.map(batch => {
        const convertedDate = formatDate(batch[0].addedDate, 'dd/MM/yyyy HH:mm', 'en-US');
        return convertedDate;
      });
      this.handleUsersFilter();
    });
  }
  ngOnDestroy(): void {
    // unsubscribe to all subscriptions
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }
}
