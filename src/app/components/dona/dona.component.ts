import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements AfterViewInit {
  @Input() title: string = "Sin Titulo";
  @Input() chartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  @Input() chartData: number[] = [65, 59, 80, 81, 56, 55, 40];
  @Input() chartBackgroundColors: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  chartId: string = `chart-${Math.random().toString(36).substr(2, 9)}`;
  chart!: Chart;

  ngAfterViewInit(): void {
    const data = {
      labels: this.chartLabels,
      datasets: [{
        label: 'My Dataset',
        data: this.chartData,
        backgroundColor: this.chartBackgroundColors,
        borderColor: this.chartBackgroundColors.map(color => color.replace('0.2', '1')),
        borderWidth: 1
      }]
    };

    this.chart = new Chart(this.chartId, {
      type: 'doughnut' as ChartType,
      data,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: this.title
          }
        }
      }
    });
  }
}
