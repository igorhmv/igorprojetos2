


import { AppRoutingModule } from './app-routing.module';



import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { MaterialModule } from './Shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { RouterModule, Routes } from '@angular/router';
//import { DownloadService } from './infra/services/download.service';

registerLocaleData(localePt);




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Shared/header/header.component';
import { MatTableModule } from '@angular/material/table';

import { MatToolbar } from '@angular/material/toolbar';

export const routes: Routes = [
  { path: "", component: HomeComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AutocompleteLibModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    MatInputModule,
    MatTableModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    RouterModule,
    MatInputModule,
    MatTableModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
