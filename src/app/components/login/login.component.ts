import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElementRef, ViewChild} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';



import { AuthenticationService } from '../../services/authentication.service';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';




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

    displayedColumns = ['userId', 'userName', 'progress', 'color'];


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private photosService: PhotosService,
        ) { }

    ngOnInit() {
        // reset login status
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


        /*
        this.photosService.getAllPhotosObservable().subscribe(
            res => this.photosArray = res,
            e => this.errorMessage = e,
            () => this.isLoading = false
            );
        console.log(this.photosArray);
        */
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
}

