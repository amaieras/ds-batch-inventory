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

  deleteBatch(id) {
    this.firestore.collection('batches').doc(id).delete().then(() => {
      console.log('Document successfully deleted!');
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
}

