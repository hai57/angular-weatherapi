import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-right-container',
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  constructor(public weatherService: WeatherService) { }
  faFaceSmile = faFaceSmile
  faThumbsDown = faThumbsDown
  faThumbsUp = faThumbsUp
  faFaceFrown = faFaceFrown

  //function to control tab values or tab states
  onClickTab(label: string) {
    if (label === "day") {
      this.weatherService.today = true;
      this.weatherService.week = false
    } else {
      this.weatherService.today = false
      this.weatherService.week = true
    }
  }
  onClickMetric(label: string) {
    if (label === 'celsius') {
      this.weatherService.celsius = true;
      this.weatherService.fahrenheit = false
    } else {
      this.weatherService.celsius = false;
      this.weatherService.fahrenheit = true
    }
  }
}
