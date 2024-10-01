import { __decorate } from "tslib";
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentVariables } from '../Environment/EnvironmentVariables';
import { TemperatureData } from '../Models/TemperatureData';
let WeatherService = class WeatherService {
    httpClient;
    //Variables which will be filled by API Endpoints
    locationDetails;
    weatherDetails;
    //variables that have the extracted data from the API EndPoint Variables
    temperatureData = new TemperatureData(); //Left-Container Data
    todayData; //Right-Container Data
    weekData = []; //Right-Container Data
    todaysHighlight; //Right-Container Data
    //variables to be used for APi calls
    cityName = "TP Ho Chi Minh";
    language = "en-US";
    date = "20200622";
    units = 'm';
    //Variables holding current time;
    currentTime;
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.getData();
    }
    getSummaryImage(summary) {
        //Base folder Address containing the images
        var baseAddress = 'D:\\angular-p\\weather-app-1\\public\\assets\\';
        //respective image names
        var cloudySunny = 'cloudy.png';
        var rainSunny = 'rain.png';
        var windy = "wind.png";
        var sunny = "sun.png";
        var rainy = 'rainy.png';
        if (String(summary).includes("Partly Cloudy") || String(summary).includes("P Cloudy"))
            return baseAddress + cloudySunny;
        else if (String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy"))
            return baseAddress + rainSunny;
        else if (String(summary).includes("wind"))
            return baseAddress + windy;
        else if (String(summary).includes("rain"))
            return baseAddress + rainy;
        else if (String(summary).includes("sun"))
            return baseAddress + sunny;
        return baseAddress + cloudySunny;
    }
    //Method to create a chunk for left container using model TemperatureData
    fillTemperatureDataModel() {
        this.currentTime = new Date();
        this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek;
        this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}}`;
        this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
        this.temperatureData.location = `${this.locationDetails.location.city[0]},${this.locationDetails.location.country}`;
        this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
        this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseShort;
        this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
    }
    //Method to create a chunk for right container using model WeekData
    fillWeekData() {
        var weekCount = 0;
        while (weekCount < 7) {
            const weekData = new WeekData();
            this.weekData.push(weekData);
            this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0, 3);
            this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount].toString();
            this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount].toString();
            this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
        }
    }
    //Method to create useful data chunks for UI using the data received fron the API
    prepareData() {
        //Setting Left Cointaner Data Model Properties
        this.fillTemperatureDataModel();
        this.fillWeekData();
    }
    //Method to get location detail from the APi using variables cityName and language as the input
    getLocationDetails(cityName, language) {
        return this.httpClient.get(EnvironmentVariables.weatherApiLocationBaseURL, {
            headers: new HttpHeaders()
                .set(EnvironmentVariables.xRapiApiKeyName, EnvironmentVariables.xRapiApiKeyValue)
                .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
            params: new HttpParams()
                .set('query', cityName)
                .set('language', language)
        });
    }
    getWeatherReport(date, latitude, longitude, language, units) {
        return this.httpClient.get(EnvironmentVariables.weatherApiForecastBaseURL, {
            headers: new HttpHeaders()
                .set(EnvironmentVariables.xRapiApiKeyName, EnvironmentVariables.xRapiApiKeyValue)
                .set(EnvironmentVariables.xRapidApiHostName, EnvironmentVariables.xRapidApiHostValue),
            params: new HttpParams()
                .set('date', date)
                .set('latitude', latitude)
                .set('longitude', longitude)
                .set('language', language)
                .set('units', units)
        });
    }
    getData() {
        var latitude = 0;
        var longitude = 0;
        this.getLocationDetails(this.cityName, this.language).subscribe({
            next: (response) => {
                this.locationDetails = response;
                latitude = this.locationDetails?.location.latitude[0];
                longitude = this.locationDetails?.location.longitude[0];
                console.log('locations', this.locationDetails);
            }
        });
        this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
            next: (response) => {
                this.weatherDetails = response;
                console.log('weather', this.weatherDetails);
            }
        });
    }
};
WeatherService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WeatherService);
export { WeatherService };
//# sourceMappingURL=weather.service.js.map