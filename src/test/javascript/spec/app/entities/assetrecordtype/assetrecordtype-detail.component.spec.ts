import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AssetrecordtypeDetailComponent } from '../../../../../../main/webapp/app/entities/assetrecordtype/assetrecordtype-detail.component';
import { AssetrecordtypeService } from '../../../../../../main/webapp/app/entities/assetrecordtype/assetrecordtype.service';
import { Assetrecordtype } from '../../../../../../main/webapp/app/entities/assetrecordtype/assetrecordtype.model';

describe('Component Tests', () => {

    describe('Assetrecordtype Management Detail Component', () => {
        let comp: AssetrecordtypeDetailComponent;
        let fixture: ComponentFixture<AssetrecordtypeDetailComponent>;
        let service: AssetrecordtypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AssetrecordtypeDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AssetrecordtypeService,
                    EventManager
                ]
            }).overrideComponent(AssetrecordtypeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetrecordtypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetrecordtypeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Assetrecordtype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.assetrecordtype).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
