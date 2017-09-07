import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthenticationService } from '../../services/authentication.service';
import { PhotosService } from '../../services/photos.service';
import { Photo } from '../../models/photo';

import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


/*
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
*/


@Component({
    moduleId: module.id,
    templateUrl: 'charts.component.html'
})

export class ChartsComponent implements OnInit {
    model: any = {};
    photosArray: Photo[] = [];
    usersArray: Array<any> = [];

    loading = false;
    errorMessage: String = '';
    observablePhotos: Observable<Photo[]>;
    error = '';
    public phoneData = <any>{};
    // public lineChartData: Array<any> = [ {data: [], label: ''}];
    // public lineChartLabels: Array<any> = [];

    // dataChart: any = [];
    closeResult: string;
    multi: any[];

    view: any[]; // = [700, '100%'];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Periodo';
    showYAxisLabel = true;
    yAxisLabel = 'N. telefonate';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  dataChart = [];
  buildedDataChart = [];

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
        private datePipe: DatePipe,
        private modalService: NgbModal
        ) { }

    ngOnInit() {

        console.log('ChartsComponent:ngOnInit');

        // this.loading = true;
        const now = new Date();
        this.model.daData = now.setDate(now.getDate() - 7);
        this.model.aData = new Date();
        this.model.numTel = '4607,4601,4623,4614';
        this.model.left = false;
        this.model.middle = false;
        this.model.right = true;
        this.model.datePicker = '';

        /*
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
        */
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


    getData() {
      console.log('ChartsComponent:getData');
      console.log(this.model);
      this.loading = true;
      console.log('ChartsComponent:getData:loading:', this.loading);
      this.model.daData = this.datePipe.transform(this.model.daData, 'yyyy-MM-dd');
      this.model.aData = this.datePipe.transform(this.model.aData, 'yyyy-MM-dd');
      this.photosService.getPhoneDataObservable(this.model)
      .subscribe(
        res => {
          this.phoneData = res;
          console.log(this.phoneData);
          // this.onChangeTable(this.config);
          this.buildChart();
          this.loading = false;
          console.log('ChartsComponent:getData:loading:', this.loading);
        },
        e => this.errorMessage = e,
        () =>  { this.loading = false; }
        );
    }


    buildChart() {
      console.log('ChartsComponent:buildChart');

      // this.lineChartLabels = [];
      // this.lineChartData = [];
      
      /*
      // per tutti i dati
      for ( let i = 0; i < this.phoneData[0].lenght; i++) {
        this.lineChartLabels.push(this.phoneData[i].id);
        // per tutte le entry verifico se esiste lo aggiorno
      }
      */

      // build labels

      /*

      let _lineChartData:Array<any> = new Array(this.phoneData[0].length);
      for (let item of this.phoneData[0].data ){
          console.log(item);

          // check nelle labels
          if ( this.lineChartLabels.indexOf(item.data_ora) === -1 ) {
            _lineChartData.push(item.data_ora);
          }

      }
      console.log(_lineChartData);
      this.lineChartLabels = _lineChartData;
      var numOfLabels = this.lineChartLabels.length;

      // per ogni dati cerco l'indice della labels e per ogni serie inserisco l'i-esimo elemento
      // init chart data
      for (let item of this.phoneData[0].data ){
          // check nelle labels
          let bFound = false;
          for (let item2 of this.lineChartData ){
            if ( item2.label === item.tel_chiamato) {
              bFound = true;
            }
          }
          if (!bFound) {
            let voidArray = [];
            for ( let j = 0; j < numOfLabels; j++) { voidArray.push(Math.floor((Math.random() * 100) + 1)); };
            this.lineChartData.push({ label : item.tel_chiamato, data: voidArray});
          }
      }
      */


      this.dataChart = [];
      let currDate = '';
      let currIndex = 0;
      let mySeries = this.phoneData[0].series;

      for ( let j = 0; j < mySeries.length; j++) {
        this.dataChart.push({
          'name': mySeries[j],
          'series' : []
          }
        );
      }

      console.log(this.dataChart);

      // riempimento dei dati
      for (let item of this.phoneData[0].data ){

        // per ogni serie
        for ( let j = 0; j < mySeries.length; j++) {

          let bFound = false; let indexFound = 0;
          // se il dato appartiene alla serie
          if ( this.dataChart[j].name === item.tel_chiamato ) {
            // da aggiornare o inserire
            for ( let k = 0; k < this.dataChart[j].series.length; k++) {
              if (this.dataChart[j].series[k].name === item.data_ora) { 
                bFound = true;
                indexFound = k;
                console.log('found:', j, k, indexFound);
              }
            }

            if (!bFound) {
              this.dataChart[j].series.push({
                'name': item.data_ora,
                'value': item.numTelefonate
              });
            } else {
              this.dataChart[j].series[indexFound].value = item.numTelefonate;
            }
          } else  {
            // il dato non appartiene alla serie quindi
            // da inserire 0 solo se non esiste

            let bFound = false; let indexFound = 0;
            for ( let k = 0; k < this.dataChart[j].series.length; k++) {
              if (this.dataChart[j].series[k].name === item.data_ora) { 
                bFound = true;
                indexFound = k;
                console.log('found:', j, k, indexFound);
              }
            }

            if (!bFound) {
              this.dataChart[j].series.push({
                'name': item.data_ora,
                'value': 0
              });
            }
          }
        }
      }


      console.log(this.dataChart);
      this.dataChart = [...this.dataChart];


    }

  public chartClicked(e: any): void {  console.log(e);  }
  public chartHovered(e: any): void {  console.log(e);  }

  public showAlert(): void { console.log('ShowAlert');  }

  
  public onCellClick(data: any): any {
    console.log(data);
  }
}