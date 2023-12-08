import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  chartOptions: Highcharts.Options = {
    /* Configure your pie chart options here */
  };
  defaultOptions: any;
  Highcharts: any;
  data: any;
  // @ViewChild('charts') public chartEl: ElementRef | any;
  @ViewChild('charts', { static: false }) chartEl: any;
  constructor(private dataService: DataService) {
    console.log(this.data);
    this.getData();
  }
  getData() {
    this.dataService.getData().subscribe(
      (response: any) => {
        console.log(response);
        this.data = this.addYValue(response);
      },
      (error) => {
        console.log('Err : ', error);
      }
    );
    console.log(this.data);
  }
  addYValue(data: any) {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      let a = data[i].balance.slice(1);
      obj['y'] = parseInt(a);
    }
    this.defaultOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: '',
      },
      // tooltip: {
      //   pointFormat: '{balance:.1f}',
      // },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      legend: {
        labelFormat: '{email} {y:.1f}',
      },
      series: [
        {
          name: 'balance',
          colorByPoint: true,
          data: data,
        },
      ],
    };
    this.createChart(this.chartEl.nativeElement);
  }
  ngOnInit(): void {}
  ngAfterViewInit() {
    setTimeout(() => {}, 500);
  }
  createChart(container: any) {
    let opts = this.defaultOptions;
    console.log(opts);
    let e = document.createElement('div');

    container.appendChild(e);

    if (opts.chart) {
      // opts.chart['renderTo'] = e;
    }
    Highcharts.chart(container, opts);
  }
}
