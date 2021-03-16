export interface BatchInfo {
  addedDate: string;
  totalCost: string;
  totalItems: string;
  actions: string;
  deletedAt?: string;
}
export interface BatchData {
  id: number;
  model: string;
  quantity: number;
  totalUnitCost: number;
  unitCost: string;
}
export interface BatchWrapper {
  info: BatchInfo;
  data: BatchData;
}

export function sortBatchesByAddedDate(b1: BatchInfo, b2: BatchInfo) {
  return b1.addedDate > b2.addedDate ? 1 : -1;
}
