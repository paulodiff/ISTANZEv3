import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

import { AuthenticationService } from '../../services/authentication.service';
import { PostaService } from '../../services/posta.service';
import { Photo } from '../../models/photo';



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
    public returnData = <any>{};
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
    yAxisLabel = 'N. Atti';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  dataChart = [];
  buildedDataChart = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private postaService: PostaService,
        private datePipe: DatePipe
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
      this.loading = true;
      this.model.daData = this.datePipe.transform(this.model.daData, 'yyyy-MM-dd');
      this.model.aData = this.datePipe.transform(this.model.aData, 'yyyy-MM-dd');
      this.model.daDataPosta = this.model.daData;
      this.model.aDataPosta = this.model.aData;
      console.log(this.model);
      this.postaService.getStats(this.model)
      .subscribe(
        res => {
          this.returnData = res;
          console.log(this.returnData);
          this.buildChart();
          this.loading = false;
        },
        e => this.errorMessage = e,
        () =>  { this.loading = false; }
        );
    }


    buildChart() {
      console.log('ChartsComponent:buildChart');

      this.dataChart = [];
      let currDate = '';
      let currIndex = 0;

      /** StatsCountItem 

          Costruzione di un array di questo tipo
      [
        {
          "name": "20170101",
          "series": [
          {
            "name": "R01 - xxx",
            "value": 40632
          },
          {
            "name": "R02 - xxxx",
            "value": 36953
          }
          ... altri elementi
        ]
      },
      {
        "name": "20170102",
        "series": [
          {
            "name": "R01 - xxx",
            "value": 49737
          },
          {
            "name": "R02 - xxx",
            "value": 0
          }
        ]
      }

      */
      console.log('ChartsComponent:buildChart:series');

      // legge tutti i dati ed imposta le serie vuote sul dataChart
      let bFound = false; let indexFound = 0;

      for (let item of this.returnData.StatsCountItem ){
        // se esiste la serie salta altrimenti inserisce
        console.log(item);
        bFound = false; indexFound = 0;
        for ( let k = 0; k < this.dataChart.length; k++) {
          if (this.dataChart[k].name === item.posta_id_cut) {
            bFound = true;
            indexFound = k;
            console.log('found:', k, indexFound);
          }
        }

        if (!bFound) {
          console.log('push:', {
            'name': item.posta_id_cut,
            'series' : []
            });
          this.dataChart.push({
            'name': item.posta_id_cut,
            'series' : []
            }
          );
        }
      }

      console.log(this.dataChart);

      console.log('ChartsComponent:buildChart:data');

      // legge tutti i dati, aggiunge il dato alla serie corretta ed aggiunge 0 alle altre se non impostate

      for (let item of this.returnData.StatsCountItem ){

        // per ogni serie
        for ( let j = 0; j < this.dataChart.length; j++) {


          // se il dato appartiene alla serie
          if ( this.dataChart[j].name === item.posta_id_cut ) {

            // controllo nella serie se il dato è da aggiornare (se presente) o inserire
            for ( let k = 0; k < this.dataChart[j].series.length; k++) {
              if (this.dataChart[j].series[k].name === item.tipo_spedizione) { 
                bFound = true;
                indexFound = k;
                console.log('found:', j, k, indexFound);
              }
            }

            if (!bFound) {
              this.dataChart[j].series.push({
                'name': item.tipo_spedizione,
                'value': item.posta_id_count
              });
            } else {
              this.dataChart[j].series[indexFound].value = item.posta_id_count;
            }
          } else  {
            // il dato non appartiene alla serie quindi
            // da inserire 0 solo se non esiste

            bFound = false; indexFound = 0;
            for ( let k = 0; k < this.dataChart[j].series.length; k++) {
              if (this.dataChart[j].series[k].name === item.tipo_spedizione) { 
                bFound = true;
                indexFound = k;
                console.log('found:', j, k, indexFound);
              }
            }

            if (!bFound) {
              this.dataChart[j].series.push({
                'name': item.tipo_spedizione,
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