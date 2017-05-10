import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { GatewayTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ModelrecordtypeDetailComponent } from '../../../../../../main/webapp/app/entities/modelrecordtype/modelrecordtype-detail.component';
import { ModelrecordtypeService } from '../../../../../../main/webapp/app/entities/modelrecordtype/modelrecordtype.service';
import { Modelrecordtype } from '../../../../../../main/webapp/app/entities/modelrecordtype/modelrecordtype.model';

describe('Component Tests', () => {

    describe('Modelrecordtype Management Detail Component', () => {
        let comp: ModelrecordtypeDetailComponent;
        let fixture: ComponentFixture<ModelrecordtypeDetailComponent>;
        let service: ModelrecordtypeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ModelrecordtypeDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ModelrecordtypeService,
                    EventManager
                ]
            }).overrideComponent(ModelrecordtypeDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModelrecordtypeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelrecordtypeService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Modelrecordtype(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.modelrecordtype).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
