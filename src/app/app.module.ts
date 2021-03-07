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
import { BatchViewComponent } from './pages/batch-view/batch-view.component';


@NgModule({
  declarations: [
    AppComponent,
    UploadCsvFileComponent,
    DsSidenavComponent,
    DsDialogMessageComponent,
    BatchViewComponent
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
    FirebaseModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ]
})
export class AppModule { }
