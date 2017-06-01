import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AssetassetmbrrecordtypeDetailComponent } from '../../../../../../main/webapp/app/entities/assetassetmbrrecordtype/assetassetmbrrecordtype-detail.component';
import { AssetassetmbrrecordtypeService } from '../../../../../../main/webapp/app/entities/assetassetmbrrecordtype/assetassetmbrrecordtype.service';
import { Assetassetmbrrecordtype } from '../../../../../../main/webapp/app/entities/assetassetmbrrecordtype/assetassetmbrrecordtype.model';

describe('Component Tests', () => {

    describe('Assetassetmbrrecordtype Management Detail Component', () => {
        let comp: AssetassetmbrrecordtypeDetailComponent;
        let fixture: ComponentFixture<AssetassetmbrrecordtypeDetailComponent>;
        let service: AssetassetmbrrecordtypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AssetassetmbrrecordtypeDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AssetassetmbrrecordtypeService,
                    EventManager
                ]
            }).overrideComponent(AssetassetmbrrecordtypeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetassetmbrrecordtypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetassetmbrrecordtypeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Assetassetmbrrecordtype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.assetassetmbrrecordtype).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
