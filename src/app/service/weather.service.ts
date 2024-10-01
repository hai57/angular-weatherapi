import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentVariables } from '../Environment/EnvironmentVariables';
import { LocationDetails } from '../Models/LocationDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { WeatherDetails } from '../Models/WeatherDetails';
import { WeekData } from '../Models/WeekData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  //Variables which will be filled by API Endpoints
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails

  //variables that have the extracted data from the API EndPoint Variables
  temperatureData?: TemperatureData = new TemperatureData();//Left-Container Data

  todayData?: TodayData[] = []//Right-Container Data
  weekData?: WeekData[] = []//Right-Container Data
  todaysHighlight?: TodaysHighlight  //Right-Container Data

  //variables to be used for APi calls
  cityName: string = "TP Ho Chi Minh";
  language: string = "en-US"
  date: string = "20200622"
  units: string = 'm'

  //Variables holding current time;
  currentTime: Date;


  //variable to control tabs
  today: boolean = false
  week: boolean = true

  //variable to control metric value
  celsius: boolean = true
  fahrenheit: boolean = false

  constructor(private httpClient: HttpClient) {
    this.getData()
  }

  getSummaryImage(summary: string): string {
    //Base folder Address containing the images
    var baseAddress = 'assets/';

    //respective image names
    var cloudySunny = 'cloudy.png'
    var rainSunny = 'rain.png'
    var windy = "wind.png"
    var sunny = "sun.png"
    var rainy = 'rainy.png'

    if (String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy")) return baseAddress + cloudySunny;
    else if (String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy")) return baseAddress + rainSunny;
    else if (String(summary).includes("wind")) return baseAddress + windy;
    else if (String(summary).includes("rain")) return baseAddress + rainy;
    else if (String(summary).includes("sun")) return baseAddress + sunny;
    return baseAddress + cloudySunny;
  }
  //Method to create a chunk for left container using model TemperatureData
  fillTemperatureDataModel() {
    this.currentTime = new Date();
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country[0]}`
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
  }

  //Method to create a chunk for right container using model WeekData
  fillWeekData() {
    var weekCount = 0
    while (weekCount < 7) {
      const weekData = new WeekData()
      this.weekData.push(weekData);
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0, 3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount];
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount];
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      weekCount++
    }
  }

  fillTodayData() {
    var todayCount = 0
    while (todayCount < 7) {
      this.todayData.push(new TodayData())
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount].slice(11, 16)
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount])
      todayCount++
    }
  }

  getTimeFromString(localTime: string) {
    return localTime.slice(12, 17)
  }

  //Method to get today's highlight data from the base variable
  fillTodaysHighlight() {
    this.todaysHighlight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todaysHighlight.humidity = this.weatherDetails['v3-wx-observations-current'].relativeHumidity
    this.todaysHighlight.sunrise = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todaysHighlight.sunset = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todaysHighlight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todaysHighlight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todaysHighlight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;

  }

  //Method to create useful data chunks for UI using the data received fron the API
  prepareData(): void {
    //Setting Left Cointaner Data Model Properties
    this.fillTemperatureDataModel();
    this.fillWeekData()
    this.fillTodayData()
    this.fillTodaysHighlight()
    console.log(this.temperatureData)
    console.log(this.weekData)
    console.log(this.todayData)
    console.log(this.todaysHighlight)
  }

  celsiusToFahrenheit(celsius: number) {
    return ((celsius * 1.8) + 32).toFixed(2);
  }
  fahrenheitToCelsius(fahrenheit: number) {
    return ((fahrenheit - 32) * 0.555).toFixed(2)
  }
  //Method to get location detail from the APi using variables cityName and language as the input

  getLocationDetails(cityName: string, language: string): Observable<LocationDetails> {
    return this.httpClient.get<LocationDetails>(EnvironmentVariables.weatherApiLocationBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentVariables.xRapiApiKeyName, EnvironmentVariables.xRapiApiKeyValue)
        .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('query', cityName)
        .set('language', language)
    })
  }

  getWeatherReport(date: string, latitude: number, longitude: number, language: string, units: string): Observable<WeatherDetails> {
    return this.httpClient.get<WeatherDetails>(EnvironmentVariables.weatherApiForecastBaseURL, {
      headers: new HttpHeaders()
        .set(EnvironmentVariables.xRapiApiKeyName, EnvironmentVariables.xRapiApiKeyValue)
        .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
      params: new HttpParams()
        .set('date', date)
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('language', language)
        .set('units', units)
    })
  }
  getData() {
    this.todayData = []
    this.weekData = []
    this.temperatureData = new TemperatureData()
    this.todaysHighlight = new TodaysHighlight()
    var latitude = 0;
    var longitude = 0

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next: (response) => {
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0];
        console.log('locations', this.locationDetails)
      }
    });


    this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
      next: (response) => {
        this.weatherDetails = response
        console.log('weather', this.weatherDetails)
        this.prepareData()

      }
    })

  }
}
