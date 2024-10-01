import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css'
})
export class LeftContainerComponent {
  faMagnifyingGlass = faMagnifyingGlass
  faLocation = faLocation
  faCloud = faCloud
  faCloudRain = faCloudRain

  constructor(public weatherService: WeatherService) {

  }
  onSearch(location: string) {
    this.weatherService.cityName = location
    this.weatherService.getData();
  }
}
