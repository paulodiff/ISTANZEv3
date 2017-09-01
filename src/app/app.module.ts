import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { PhotosService } from './services/photos.service';
import { UserService } from './services/user.service';
import { httpFactory } from './services/httpfactory.service';

import { LoginComponent } from './components/login/login.component';
import { DataTableComponent } from './components/datatable/datatable.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ModalContentComponent } from './components/charts/modalcontent.component';
import { GlobalErrorHandler } from './services/globalerrorhandler.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { routing } from './app.routing';


// import {CdkTableModule} from '@angular/cdk/table';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';


import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/*
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalModule } from 'ngx-bootstrap/modal';

*/

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    DataTableComponent,
    ChartsComponent,
    ModalContentComponent,
    SidebarComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ChartsModule,
    NgxDatatableModule,
    NgxChartsModule
  ],

  entryComponents: [
    ModalContentComponent
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
    },
    DatePipe
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
