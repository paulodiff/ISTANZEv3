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
    templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {
    model: any = {};
    photosArray: Photo[] = [];
    isLoading: Boolean = false;
    errorMessage: String = '';
    observablePhotos: Observable<Photo[]>;
    error = '';
    source: any = [];
    result: any;
    user: any = {};


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
        this.logger.info('ProfileComponent:ngOnInit');

        /*    
        this.authenticationService.getProfile()
        .subscribe(result => {
            this.logger.info(result);
            if (result === true) {
                // this.router.navigate(['/']);
            } else {
                this.isLoading = false;
                this.dialogService
                .confirm('Confirm Dialog', 'Username or password is incorrect!')
                .then(res => { this.result = res; console.log(' return:', res); });
            }
        },
        (err) => { this.error = err; console.log('ProfileComponent:getProfile:ERROR:', err); }
        );
        */
    }


    getProfileData() {
        this.isLoading = true;
        this.authenticationService.getProfile()
        .subscribe(result => {
            this.logger.info('ProfileComponent');
            this.logger.info(result);
            this.user = result;
            this.logger.info(this.user);
            },
            (err) => { 
                this.error = err; 
                console.log('ProfileComponent:getProfile:ERROR:', err); 
                this.logger.errorDialog(err);
            }
        );
    }

    openDialog() {
        console.log('...open dialog...');
        this.dialogService
          .confirm('Confirm Dialog', 'Are you sure you want to do this?')
          .then(res => { this.result = res; console.log('Dialog return:', res); })
          .catch( function(err) { console.log(err); });
    }
}


