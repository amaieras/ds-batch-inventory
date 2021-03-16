import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadCsvFileComponent } from './components/upload-csv-file/upload-csv-file.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DsSidenavComponent } from './components/core/ds-sidenav/ds-sidenav.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material-module';
import {FirebaseModule} from './firebase-module';
import { DsDialogMessageComponent } from './components/core/ds-dialog-message/ds-dialog-message.component';
import { BatchViewComponent } from './pages/batch-list-view-page/batch-list-view.component';
import { BatchesListViewComponent } from './components/batches-list-view/batches-list-view.component';
import { BatchComponent } from './components/batch/batch.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { AddClientComponent } from './pages/add-client/add-client.component';
import {FlexModule} from '@angular/flex-layout';
import {LoadingComponent} from './components/core/loading/loading.component';
import { LoadingService } from './components/core/loading/loading.service';
// for Core import:
import { LoadingBarModule } from '@ngx-loading-bar/core';
import {MessagesComponent} from './components/core/messages/messages.component';
import {MessagesService} from './components/core/messages/messages.service';
import { ClientComponent } from './components/client/client/client.component';
import { BatchPageComponent } from './pages/batch-page/batch-page.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadCsvFileComponent,
    DsSidenavComponent,
    DsDialogMessageComponent,
    BatchViewComponent,
    BatchesListViewComponent,
    BatchComponent,
    ConfirmDialogComponent,
    BatchComponent,
    AddClientComponent,
    LoadingComponent,
    MessagesComponent,
    ClientComponent,
    BatchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FirebaseModule,
    FontAwesomeModule,
    FlexModule,
    // for Core use:
    LoadingBarModule

  ],
  bootstrap: [AppComponent],
  providers: [
    LoadingService,
    MessagesService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule { }
