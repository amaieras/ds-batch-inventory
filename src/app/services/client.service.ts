import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private db: AngularFirestore) { }

  saveClient(client) {
    const promise = this.db.collection('clients').doc().set(client);
    return from(promise);
  }

  getClients() {
    return this.db.collection('clients').valueChanges();
  }
}
