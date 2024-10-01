import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
describe('WeatherService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WeatherService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=weather.service.spec.js.map