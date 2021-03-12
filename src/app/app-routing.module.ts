import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BatchViewComponent} from './pages/batch-view/batch-view.component';
import {AddClientComponent} from './pages/add-client/add-client.component';


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
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
