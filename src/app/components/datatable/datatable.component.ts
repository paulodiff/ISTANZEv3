import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { PostaService } from '../../services/posta.service';
import { Photo } from '../../models/photo';

import { Observable } from 'rxjs';

import { TableData } from './table-data';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    moduleId: module.id,
    templateUrl: 'datatable.component.html'
})

export class DataTableComponent implements OnInit {
    model: any = {};
    photosArray: Photo[] = [];
    loading = false;
    errorMessage: String = '';
    observablePhotos: Observable<Photo[]>;
    error = '';
    rows = [];
    columns = [
      { prop: 'albumId' },
      { name: 'thumbnailUrl' },
      { name: 'title' }
    ];

  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 5;
  public numPages:number = 1;
  public length:number = 0;

public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

   data:Array<any> = [];

    /*
    rows = [
            { name: 'Austin', gender: 'Male', company: 'Swimlane' },
            { name: 'Dany', gender: 'Male', company: 'KFC' },
            { name: 'Molly', gender: 'Female', company: 'Burger King' },
        ];
        columns = [
            { prop: 'name' },
            { name: 'Gender' },
            { name: 'Company' }
        ];
    */    

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private postaService: PostaService,
        ) { }

    ngOnInit() {

        console.log('DataTableComponent:ngOnInit');

        this.loading = true;

        this.postaService.getCDC().subscribe(
            res => {
                this.rows = res;
                console.log(this.rows);
                },
            e => { this.errorMessage = e; this.loading = false; },
            () =>  {  this.loading = false; }
            );
        // console.log(this.data);


        // reset login status
        // this.authenticationService.logout();
        // this.photosService.getAllPhotos().then(res => this.photosArray = res);

        // this.observablePhotos = this.photosService.getAllPhotosObservable();

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



    pdfMake() {
        const dd = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
        };
        pdfMake.createPdf(dd).open();

    }



}
