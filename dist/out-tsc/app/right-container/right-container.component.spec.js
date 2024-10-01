import { TestBed } from '@angular/core/testing';
import { RightContainerComponent } from './right-container.component';
describe('RightContainerComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RightContainerComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(RightContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=right-container.component.spec.js.map