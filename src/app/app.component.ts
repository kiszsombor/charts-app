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
  ApexYAxis,
  ApexAnnotations
} from "ng-apexcharts";

import { Data } from "./data";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
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
      annotations: {
        xaxis: [
          {
            x: 100,
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Anno Test"
            }
          },
          {
            x: arrTime[0],
            x2: arrTime[1],
            fillColor: "#B3F7CA",
            opacity: 0.4,
            label: {
              borderColor: "#B3F7CA",
              style: {
                fontSize: "10px",
                color: "#fff",
                background: "#00E396"
              },
              offsetY: -10,
              text: "X-axis range"
            }
          }
        ],
        yaxis: [
          {
            y: 0.8,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              text: "Support"
            }
          },
          {
            y: 0.44,
            y2: 0.68,
            borderColor: "#000",
            fillColor: "#FEB019",
            opacity: 0.2,
            label: {
              borderColor: "#333",
              style: {
                fontSize: "10px",
                color: "#333",
                background: "#FEB019"
              },
              text: "Y-axis range"
            }
          }
        ],
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        // width: [4, 4, 4, 4]
        curve: "straight"
      },
      /*
      grid: {
        padding: {
          right: 30,
          left: 20
        }
      },*/
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
          },
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
            color: "#FF4560"
          },
          labels: {
            style: {
              color: "#FF4560"
            }
          },
          title: {
            text: "Voltage",
            style: {
              color: "#FF4560"
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
          fillColors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"]
        }
      }
    };

    // console.log(this.chartOptions.annotations);
  }
}