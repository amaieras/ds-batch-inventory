import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {first, map, startWith, take, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BatchInfo} from '../../model/batch';
import {formatDate} from '@angular/common';
import {BatchesStore} from '../../services/batches.store';
import {BatchService} from '../../services/batch.service';
import {Observable, Subject} from 'rxjs';
import {Utils} from '../../shared/utils';
import {MessagesService} from '../core/messages/messages.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import _ from 'lodash';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  batchOptions: string[] = [];
  filteredBatchOptions: Observable<string[]>;
  phoneOptions: any[] = [];
  filteredPhoneOptions: Observable<string[]>;
  // used to unsubscribe multiple subscriptions
  unsubscribeSignal: Subject<void> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private _batchStore: BatchesStore,
              private _messages: MessagesService,
              private _batchService: BatchService,
              private _clientService: ClientService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.initBatchInfo();
    this.initForm();
    this.initBatchData();

  }
  private _filter(options, value: any): string[] {
    if (value === null) { return []; }

    const filterValue = value.realValue ? value.realValue.toLowerCase() : value.toLowerCase() ;
    return options.filter(option => option.realValue.toLowerCase().includes(filterValue));
  }

  save(client, form) {
    if (this.formGroup.status === 'VALID') {
      this._batchStore.getStore().pipe(
        first(),
        map(resp => resp[0] || [])
      ).subscribe(store => {
        const newStore = _.clone(store);
        newStore[client.phone.realValue].quantity = newStore[client.phone.realValue].quantity - client.quantity;
        if (newStore[client.phone.realValue].quantity >= 0) {
          this._batchStore.saveStore(newStore).pipe(
            first()
          ).subscribe(() => {
            const message = 'Client salvat cu succes.';
            Utils.openDialog(false, message, this._snackBar);
            const addedDate = new Date().getTime().toString();
            client.addedDate = addedDate;
            this._clientService.saveClient(client);
            this.initBatchData();
            form.reset();
          });
        } else {
          const err = 'Stoc insuficient';
          this._messages.showErrors(err);
        }
      });
    } else {
      const err = 'Nu sunt completate toate campurile obligatorii.';
      this._messages.showErrors(err);
    }
  }


  private handleUsersFilter() {
    this.filteredOptions = this.formGroup.controls.username.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.options, value))
      );
    // this.filteredBatchOptions = this.formGroup.controls.batch.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(this.batchOptions, value))
    //   );
    this.filteredPhoneOptions = this.formGroup.controls.phone.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(this.phoneOptions, value))
      );
  }

  private initForm() {
    this.formGroup = this.formBuilder.group({
      username: [null, [Validators.required]],
      phone: [null, [Validators.required]],
      quantity: [1, [Validators.required]]
    });
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required') ? 'Field is required' : '';
  }

  private initBatchInfo() {
    this._batchStore.getSortedBatchesInfo().pipe(
      takeUntil(this.unsubscribeSignal.asObservable())
    ).subscribe((batches: BatchInfo[]) => {
      this.batchOptions = batches.map(batch => {
        const convertedDate = formatDate(batch.addedDate, 'dd/MM/yyyy HH:mm', 'en-US');
        return convertedDate;
      });
    });
  }

  private initBatchData() {
    this._batchStore.getStore().pipe(
      map(resp => resp[0] || [])
    ).subscribe(store => {
      const phones = [];
      for (const key in store) {
        if (!phones.includes(store[key].model)) {
          phones.push({
            displayValue: `${store[key].model} - ${store[key].quantity}`,
            realValue: Utils.replaceAndSnake(store[key].model)
          });
        }
      }
      this.phoneOptions = phones;
      this.handleUsersFilter();
    });
  }

  getOptionText(option) {
    return option?.displayValue;
  }
  ngOnDestroy(): void {
    // unsubscribe to all subscriptions
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }
}
