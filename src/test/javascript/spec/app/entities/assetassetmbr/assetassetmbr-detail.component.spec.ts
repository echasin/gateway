import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AssetassetmbrDetailComponent } from '../../../../../../main/webapp/app/entities/assetassetmbr/assetassetmbr-detail.component';
import { AssetassetmbrService } from '../../../../../../main/webapp/app/entities/assetassetmbr/assetassetmbr.service';
import { Assetassetmbr } from '../../../../../../main/webapp/app/entities/assetassetmbr/assetassetmbr.model';

describe('Component Tests', () => {

    describe('Assetassetmbr Management Detail Component', () => {
        let comp: AssetassetmbrDetailComponent;
        let fixture: ComponentFixture<AssetassetmbrDetailComponent>;
        let service: AssetassetmbrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [AssetassetmbrDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AssetassetmbrService,
                    EventManager
                ]
            }).overrideComponent(AssetassetmbrDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssetassetmbrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssetassetmbrService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Assetassetmbr(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.assetassetmbr).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
