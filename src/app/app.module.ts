import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { PhotosService } from './services/photos.service';
import { UserService } from './services/user.service';

import { LoginComponent } from './components/login/login.component';

import { DataTableComponent } from './components/datatable/datatable.component';

import { GlobalErrorHandler } from './services/globalerrorhandler.service';


import { routing } from './app.routing';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { Ng2TableModule } from 'ng2-table/ng2-table';

import { PaginationModule } from 'ngx-bootstrap';

import { TabsModule } from 'ngx-bootstrap';

import { httpFactory } from './services/httpfactory.service';

import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    DataTableComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    Ng2TableModule,
    PaginationModule.forRoot(),
    TabsModule
  ],

  providers: [
    AuthenticationService,
    UserService,
    PhotosService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
