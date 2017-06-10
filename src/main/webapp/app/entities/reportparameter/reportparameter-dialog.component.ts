import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Reportparameter } from './reportparameter.model';
import { ReportparameterPopupService } from './reportparameter-popup.service';
import { ReportparameterService } from './reportparameter.service';
import { Report, ReportService } from '../report';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-reportparameter-dialog',
    templateUrl: './reportparameter-dialog.component.html'
})
export class ReportparameterDialogComponent implements OnInit {

    reportparameter: Reportparameter;
    authorities: any[];
    isSaving: boolean;

    reports: Report[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private reportparameterService: ReportparameterService,
        private reportService: ReportService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.reportService.query()
            .subscribe((res: ResponseWrapper) => { this.reports = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.reportparameter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reportparameterService.update(this.reportparameter));
        } else {
            this.subscribeToSaveResponse(
                this.reportparameterService.create(this.reportparameter));
        }
    }

    private subscribeToSaveResponse(result: Observable<Reportparameter>) {
        result.subscribe((res: Reportparameter) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Reportparameter) {
        this.eventManager.broadcast({ name: 'reportparameterListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackReportById(index: number, item: Report) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-reportparameter-popup',
    template: ''
})
export class ReportparameterPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportparameterPopupService: ReportparameterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.reportparameterPopupService
                    .open(ReportparameterDialogComponent, params['id']);
            } else {
                this.modalRef = this.reportparameterPopupService
                    .open(ReportparameterDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
