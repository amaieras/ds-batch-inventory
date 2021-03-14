import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BatchViewComponent} from './pages/batch-view/batch-view.component';
import {AddClientComponent} from './pages/add-client/add-client.component';
import {ClientListViewPageComponent} from './pages/client-list-view-page/client-list-view-page.component';


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
    path: 'clients',
    component: ClientListViewPageComponent
  },
  {
    path: 'batches',
    component: BatchViewComponent
  },
  {
    path: '**',
    component: AddClientComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
