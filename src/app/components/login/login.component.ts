import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication.service';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';
// Import the application components and services.
import { Logger } from '../../services/logger.service';

// import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
// import { ModalComponent } from '../../components/modal/modal.component';

import { DialogService } from '../../services/dialog.service';



@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    photosArray: Photo[] = [];
    isLoading: Boolean = false;
    errorMessage: String = '';
    observablePhotos: Observable<Photo[]>;
    error = '';
    source: any = [];
    result: any;
    loggedIn: boolean = false;
    credentials: any = {
        username: '',
        password: ''
     };

    displayedColumns = ['userId', 'userName', 'progress', 'color'];
    settings = {
        columns: {
                    id: {title: 'ID'     },
                    title: {title: 'title'},
                    url: { title: 'Url' }
        },
        add: {
            addButtonContent: '<i class="ion-add">ADD</i>',
            createButtonContent: '<i class="ion-checkmark">CREATE</i>',
            cancelButtonContent: '<i class="ion-close">CANCEL</i>',
            confirmCreate: true
          }
      };


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private photosService: PhotosService,
        private logger: Logger,
        private dialogService: DialogService
        ) { }

    ngOnInit() {
        // reset login status
        this.logger.info('LoginComponent:ngOnInit');
        this.loggedIn = this.authenticationService.isAuthenticated();
        // this.isLoading = true;
        // this.authenticationService.logout();
        // this.photosService.getAllPhotos().then(res => this.photosArray = res);

        // this.observablePhotos = this.photosService.getAllPhotosObservable();
        // this.isLoading = false;


        // this.dataSource = new ExampleDataSource(this.exampleDatabase);
        /*
        Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { 
              console.log('NO DATA SOURCE!');
              return; 
            }
            console.log(this.dataSource);
          this.dataSource.filter = this.filter.nativeElement.value;
        });
        */


        /*
        this.photosService.getAllPhotosObservable().subscribe(
            res => this.source = res,
            e => this.errorMessage = e,
            () => this.isLoading = false
            );
        console.log(this.source);
        */

        // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }



    login() {
        this.logger.info('LoginComponent:login');
        this.isLoading = true;
        this.credentials.username = this.model.username;
        this.credentials.password = this.model.password;

        this.authenticationService.login(this.credentials)
            .subscribe(result => {
                this.logger.info(result);
                if (result === true) {
                    this.logger.info('LoginComponent:login:OK!');
                    this.loggedIn = true;
                    // this.router.navigate(['/']);
                } else {
                    this.logger.info('Result false');
                    this.dialogService
                    .confirm('Confirm Dialog', 'Username or password is incorrect!')
                    .then(res => { this.result = res; console.log('Dialog return:', res); });
                }
                this.isLoading = false;
            },
            (err) => {
                    this.error = err; 
                    this.logger.info('LoginComponent:login:ERROR:', err);
           }
        );
    }

    logout() {
        this.logger.info('LoginComponent:logut');
        this.authenticationService.logout();
        this.loggedIn = false;
    }

    login2() {
        console.log('LoginComponent:login2');
        this.isLoading = true;

        this.photosService.getAllPhotosObservable().subscribe(
            res => this.photosArray = res,
            e => this.errorMessage = e,
            () => this.isLoading = false
            );
        console.log(this.photosArray);
    }

    openDialog() {
        console.log('...open dialog...');
        this.dialogService
          .confirm('Confirm Dialog', 'Are you sure you want to do this?')
          .then(res => { this.result = res; console.log('Dialog return:', res); })
          .catch( function(err) { console.log(err); });
    }
}


