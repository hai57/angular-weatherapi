import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
let RightContainerComponent = class RightContainerComponent {
    faFaceSmile = faFaceSmile;
    faThumbsDown = faThumbsDown;
    faThumbsUp = faThumbsUp;
    faFaceFrown = faFaceFrown;
    //variable to control tabs
    today = false;
    week = true;
    //variable to control metric value
    celsius = true;
    fahrenheit = false;
    //function to control tab values or tab states
    onClickTab(label) {
        if (label === "day") {
            this.today = true;
            this.week = false;
        }
        else {
            this.today = false;
            this.week = true;
        }
    }
    onClickMetric(label) {
        if (label === 'celsius') {
            this.celsius = true;
            this.fahrenheit = false;
        }
        else {
            this.celsius = false;
            this.fahrenheit = true;
        }
    }
};
RightContainerComponent = __decorate([
    Component({
        selector: 'app-right-container',
        templateUrl: './right-container.component.html',
        styleUrl: './right-container.component.css'
    })
], RightContainerComponent);
export { RightContainerComponent };
//# sourceMappingURL=right-container.component.js.map