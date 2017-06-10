import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Reportparameter } from './reportparameter.model';
import { ReportparameterService } from './reportparameter.service';

@Component({
    selector: 'jhi-reportparameter-detail',
    templateUrl: './reportparameter-detail.component.html'
})
export class ReportparameterDetailComponent implements OnInit, OnDestroy {

    reportparameter: Reportparameter;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private reportparameterService: ReportparameterService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReportparameters();
    }

    load(id) {
        this.reportparameterService.find(id).subscribe((reportparameter) => {
            this.reportparameter = reportparameter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReportparameters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reportparameterListModification',
            (response) => this.load(this.reportparameter.id)
        );
    }
}
