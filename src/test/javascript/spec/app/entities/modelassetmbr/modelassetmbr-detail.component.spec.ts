import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModelassetmbrDetailComponent } from '../../../../../../main/webapp/app/entities/modelassetmbr/modelassetmbr-detail.component';
import { ModelassetmbrService } from '../../../../../../main/webapp/app/entities/modelassetmbr/modelassetmbr.service';
import { Modelassetmbr } from '../../../../../../main/webapp/app/entities/modelassetmbr/modelassetmbr.model';

describe('Component Tests', () => {

    describe('Modelassetmbr Management Detail Component', () => {
        let comp: ModelassetmbrDetailComponent;
        let fixture: ComponentFixture<ModelassetmbrDetailComponent>;
        let service: ModelassetmbrService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModelassetmbrDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModelassetmbrService,
                    EventManager
                ]
            }).overrideComponent(ModelassetmbrDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModelassetmbrDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelassetmbrService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modelassetmbr(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modelassetmbr).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
