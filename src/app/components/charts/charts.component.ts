import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';

import { Observable } from 'rxjs';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
    moduleId: module.id,
    templateUrl: 'charts.component.html'
})

export class ChartsComponent implements OnInit {
    model: any = {};
    photosArray: Photo[] = [];
    usersArray: Array<any> = [];
    loading = false;
    isLoading: Boolean = true;
    errorMessage: String = '';
    observablePhotos: Observable<Photo[]>;
    error = '';
    public rows: Array<any> = [];
    public columns: Array<any> = [
    {title: 'Name1', name: 'id'},
    {title: 'Name2', name: 'albumId'},
    {
      title: 'Position',
      name: 'title',
      sort: false
    },
    // {title: 'Office', className: ['office-header', 'text-success'], name: 'title', sort: 'asc'},
    // {title: 'Extn.', name: 'ext', sort: '', filtering: {filterString: '', placeholder: 'Filter by extn.'}},
    // {title: 'Start date', className: 'text-warning', name: 'startDate'},
    {title: 'Url', name: 'url',filtering: {filterString: '', placeholder: 'Filter by 44.'}}
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

public config:any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

   data:Array<any> = [];

  public phoneData = <any>{};
  // public lineChartData: Array<any> = [];
  // public lineChartLabels: Array<any> = [];
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: '4614'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: any = { responsive: true };
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'bar';


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
        private photosService: PhotosService,
        private datePipe: DatePipe
        ) { }

    ngOnInit() {

        console.log('ChartsComponent:ngOnInit');

        this.loading = true;
        const now = new Date();
        this.model.daData = now.setDate(now.getDate() - 7);
        this.model.aData = new Date();
        this.model.numTel = '4607';


        this.photosService.getAllUsersObservable().subscribe(
            res => {
                this.phoneData = res;
                console.log(this.phoneData);
                // this.onChangeTable(this.config);
                this.buildChart();
                this.loading = false;

                },
            e => this.errorMessage = e,
            () =>  { this.isLoading = false;  this.loading = false; }
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

    login_source() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    getData() {
      console.log('ChartsComponent:getData');
      console.log(this.model);
      this.datePipe.transform(this.model.daData, 'yyyy-MM-dd');
      this.loading = true;
      this.photosService.getPhoneDataObservable(this.model)
      .subscribe(
        res => {
          this.phoneData = res;
          console.log(this.phoneData);
          // this.onChangeTable(this.config);
          this.buildChart();
          this.loading = false;
        },
        e => this.errorMessage = e,
        () =>  { this.isLoading = false;  this.loading = false; }
        );
        this.loading = false;
    }

    login() {
        this.loading = true;

        this.photosService.getAllUsersObservable().subscribe(
            res => this.photosArray = res,
            e => this.errorMessage = e,
            () => this.loading = false
            );
        console.log(this.photosArray);
    }

    buildChart() {
      console.log('ChartsComponent:buildChart');
      this.lineChartLabels = [];
      this.lineChartData[0].data = [];
      this.lineChartData[0].label = this.model.numTel;

      for (let item of this.phoneData.dataset ){
          // console.log(item);
          // console.log(this.lineChartData);
          this.lineChartData[0].data.push(item.numTelefonate);
          this.lineChartLabels.push(item.tel_data.substring(0, 10));
      }
    }

    public chartClicked(e: any): void {  console.log(e);  }
    public chartHovered(e: any): void {  console.log(e);  }

public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data:any, config:any):any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName:string = void 0;
    let sort:string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this.columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this.columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }




}
