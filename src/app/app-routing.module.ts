import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BatchViewComponent} from "./pages/batch-view/batch-view.component";


const routes: Routes = [
  {
    path: 'batches',
    component: BatchViewComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
