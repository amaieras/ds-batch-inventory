import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BatchService} from "../../services/batch.service";

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {
  batchData: any;
  constructor(private _activatedRoute: ActivatedRoute,
              private _batchService: BatchService) { }

  ngOnInit(): void {
   const batchId = this._activatedRoute.snapshot.paramMap.get('id');
   this._batchService.getBatchById(batchId).subscribe(resp => {
     this.batchData = resp.data();
   });
  }

}
