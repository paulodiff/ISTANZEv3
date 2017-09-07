import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';



import { AuthenticationService } from '../../services/authentication.service';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';
// Import the application components and services.
import { Logger } from '../../services/default-log.service';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import { ModalComponent } from '../../components/modal/modal.component';
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
        private modalService: NgbModal,
        private dialogService: DialogService
        ) { }

    ngOnInit() {
        // reset login status
        this.logger.info('Start...logger');
        this.logger.group( 'Group Test' );
        this.logger.log( 'Inside a group.' );
        this.logger.error( 'Inside a group.' );
        this.logger.info( 'Inside a group.' );
        this.logger.warn( 'Inside a group.' );
        this.logger.groupEnd();

        console.log('LoginComponent:ngOnInit');
        this.isLoading = true;
        this.authenticationService.logout();
        // this.photosService.getAllPhotos().then(res => this.photosArray = res);

        this.observablePhotos = this.photosService.getAllPhotosObservable();
        this.isLoading = false;


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



        this.photosService.getAllPhotosObservable().subscribe(
            res => this.source = res,
            e => this.errorMessage = e,
            () => this.isLoading = false
            );
        console.log(this.source);

        // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }



    login_source() {
        console.log('LoginComponent:login_source');
        this.isLoading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.isLoading = false;
                }
            });
    }

    login() {
        console.log('LoginComponent:login');
        this.isLoading = true;

        this.photosService.getAllPhotosObservable().subscribe(
            res => this.photosArray = res,
            e => this.errorMessage = e,
            () => this.isLoading = false
            );
        console.log(this.photosArray);
    }

    openModal() {
        console.log('...open modal...');
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.name = 'World';
        modalRef.componentInstance.title = 'Title - World';
        console.log(modalRef.result);
    }

    openDialog() {
        console.log('...open dialog...');
        this.dialogService
          .confirm('Confirm Dialog', 'Are you sure you want to do this?')
          .then(res => { this.result = res; console.log('Dialog return:', res); })
          .catch( function(err) { console.log(err); });
    }
}

