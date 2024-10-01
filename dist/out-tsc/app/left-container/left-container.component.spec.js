import { TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LeftContainerComponent } from './left-container.component';
describe('LeftContainerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LeftContainerComponent, FontAwesomeModule]
        })
            .compileComponents();
        fixture = TestBed.createComponent(LeftContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=left-container.component.spec.js.map