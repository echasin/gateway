import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Modelrecordtype } from './modelrecordtype.model';
import { ModelrecordtypePopupService } from './modelrecordtype-popup.service';
import { ModelrecordtypeService } from './modelrecordtype.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-modelrecordtype-dialog',
    templateUrl: './modelrecordtype-dialog.component.html'
})
export class ModelrecordtypeDialogComponent implements OnInit {

    modelrecordtype: Modelrecordtype;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private modelrecordtypeService: ModelrecordtypeService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.modelrecordtype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modelrecordtypeService.update(this.modelrecordtype));
        } else {
            this.principal.identity().then((account) => {
            this.modelrecordtype.lastmodifiedby=account.lastModifiedBy;
            this.modelrecordtype.status="Active";
            this.subscribeToSaveResponse(
            this.modelrecordtypeService.create(this.modelrecordtype));
          });
        }
    }

    private subscribeToSaveResponse(result: Observable<Modelrecordtype>) {
        result.subscribe((res: Modelrecordtype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Modelrecordtype) {
        this.eventManager.broadcast({ name: 'modelrecordtypeListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-modelrecordtype-popup',
    template: ''
})
export class ModelrecordtypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelrecordtypePopupService: ModelrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.modelrecordtypePopupService
                    .open(ModelrecordtypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.modelrecordtypePopupService
                    .open(ModelrecordtypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
