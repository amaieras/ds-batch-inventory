import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BatchViewComponent} from './pages/batch-list-view-page/batch-list-view.component';
import {AddClientComponent} from './pages/add-client/add-client.component';
import {BatchPageComponent} from './pages/batch-page/batch-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'add-client',
    pathMatch: 'full'
  },
  {
    path: 'add-client',
    component: AddClientComponent
  },
  {
    path: 'batches',
    component: BatchViewComponent
  },
  {
    path: 'batch/:id',
    component: BatchPageComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
