import { Component } from '@angular/core';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css'],
})
export class MyBarChartComponent {
  multi!: any[];

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  constructor(private countryService: CountryService) {}

  get single() {
    return this.countryService.countryData;
  }

  onSelect(event: any) {
    console.log(event);
  }
}
