import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexTooltip,
  ApexXAxis,
  ApexLegend,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexYAxis
} from "ng-apexcharts";

import { Data } from "./data";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  @ViewChild("chart")
  chart!: ChartComponent;

  public chartOptions: Partial<ChartOptions> | any;

  productsArray = new Array<Data>;

  constructor() {
  }

  async ngOnInit(): Promise<void> {

    let arrTime : Array<number> = new Array;
    let arrPower : Array<number> = new Array;
    let arrRpm : Array<number> = new Array;
    let arrVibration : Array<number> = new Array;
    let arrVoltage : Array<number> = new Array;

    await fetch('./assets/data.json').then(res => res.json()).then(jsonData => {
      this.productsArray = jsonData;
    });

    this.productsArray.forEach(i => {
        arrTime.push(i.TimeMs);
        arrPower.push(i.Power);
        arrRpm.push(i.Rpm);
        arrVibration.push(i.Vibration);
        arrVoltage.push(i.Voltage);
      } );

    this.chartOptions = {
      series: [
        {
          name: "Power",
          type: "line",
          data: arrPower
        },
        {
          name: "Rpm",
          type: "line",
          data: arrRpm
        },
        {
          name: "Vibration",
          type: "line",
          data: arrVibration
        },
        {
          name: "Voltage",
          type: "line",
          data: arrVoltage
        },
      ],
      chart: {
        height: 700,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [4, 4, 4, 4]
      },
      title: {
        text: "Time ms",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: arrTime,
        labels: {
          formatter: function(val: string) {
            return val + " ms";
          }
        }
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              color: "#008FFB"
            }
          },
          title: {
            text: "Power",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Rpm",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              color: "#00E396"
            }
          },
          title: {
            text: "Revolutions per minute",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Vibration",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              color: "#FEB019"
            }
          },
          title: {
            text: "Vibration",
            style: {
              color: "#FEB019"
            }
          },
        },
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#ff4560"
          },
          labels: {
            style: {
              color: "#ff4560"
            }
          },
          title: {
            text: "Voltage",
            style: {
              color: "#ff4560"
            }
          },
          tooltip: {
            enabled: true
          }
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
        markers: {
          fillColors: ["#00E396", "#775DD0"]
        }
      }
    };
  }
}