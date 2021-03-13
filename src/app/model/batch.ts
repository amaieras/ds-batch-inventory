export interface Batch {
  addedDate: string;
  totalCost: string;
  totalItems: string;
  actions: string;
  deletedAt?: string;
}


export function sortBatchesByAddedDate(b1: Batch, b2: Batch) {
  return b1.addedDate > b2.addedDate ? 1 : -1;
}
