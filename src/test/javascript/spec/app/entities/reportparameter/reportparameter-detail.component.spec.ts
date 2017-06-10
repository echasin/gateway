import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ReportparameterDetailComponent } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter-detail.component';
import { ReportparameterService } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.service';
import { Reportparameter } from '../../../../../../main/webapp/app/entities/reportparameter/reportparameter.model';

describe('Component Tests', () => {

    describe('Reportparameter Management Detail Component', () => {
        let comp: ReportparameterDetailComponent;
        let fixture: ComponentFixture<ReportparameterDetailComponent>;
        let service: ReportparameterService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ReportparameterDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ReportparameterService,
                    EventManager
                ]
            }).overrideComponent(ReportparameterDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ReportparameterDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReportparameterService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Reportparameter(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.reportparameter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
