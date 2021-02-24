import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadCsvFileComponent} from './components/upload-csv-file/upload-csv-file.component';


const routes: Routes = [
  {
    path: 'upload-file',
    component: UploadCsvFileComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
