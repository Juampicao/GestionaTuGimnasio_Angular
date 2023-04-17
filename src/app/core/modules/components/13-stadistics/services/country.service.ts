import { Injectable } from '@angular/core';

interface Country {
  name: string;
  value: number;
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  private data: Country[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  // private data: any = [
  //   { name: 'John', value: 25 },
  //   { name: 'Jane', value: 30 },
  //   { name: 'Bob', value: 20 },
  //   { name: 'Alice', value: 15 },
  //   { name: 'Mike', value: 10 }
  // ];

  get countryData() {
    return this.data;
  }

  randomData() {
    this.data = [
      {
        "name": "Germany",
        "value": Math.random() * 1000000
      },
      {
        "name": "USA",
        "value": Math.random() * 1000000
      },
      {
        "name": "France",
        "value": Math.random() * 1000000
      },
        {
        "name": "UK",
        "value": Math.random() * 1000000
      }
    ];
  }

}