import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private firestore: AngularFirestore) { }

  getBatches() {
    return this.firestore.collection('batches').valueChanges();
  }
}
