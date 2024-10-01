import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
let LeftContainerComponent = class LeftContainerComponent {
    faMagnifyingGlass = faMagnifyingGlass;
    faLocation = faLocation;
    faCloud = faCloud;
    faCloudRain = faCloudRain;
    constructor(weatherService) {
    }
};
LeftContainerComponent = __decorate([
    Component({
        selector: 'app-left-container',
        templateUrl: './left-container.component.html',
        styleUrl: './left-container.component.css'
    })
], LeftContainerComponent);
export { LeftContainerComponent };
//# sourceMappingURL=left-container.component.js.map