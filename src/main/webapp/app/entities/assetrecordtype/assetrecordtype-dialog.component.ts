import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Assetrecordtype } from './assetrecordtype.model';
import { AssetrecordtypePopupService } from './assetrecordtype-popup.service';
import { AssetrecordtypeService } from './assetrecordtype.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-assetrecordtype-dialog',
    templateUrl: './assetrecordtype-dialog.component.html'
})
export class AssetrecordtypeDialogComponent implements OnInit {

    assetrecordtype: Assetrecordtype;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private assetrecordtypeService: AssetrecordtypeService,
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
        if (this.assetrecordtype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assetrecordtypeService.update(this.assetrecordtype));
        } else {
             this.principal.identity().then((account) => {
             this.assetrecordtype.lastmodifiedby=account.lastModifiedBy;
             this.assetrecordtype.status="Active";
             this.subscribeToSaveResponse(
             this.assetrecordtypeService.create(this.assetrecordtype));
            });
        }
    }

    private subscribeToSaveResponse(result: Observable<Assetrecordtype>) {
        result.subscribe((res: Assetrecordtype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Assetrecordtype) {
        this.eventManager.broadcast({ name: 'assetrecordtypeListModification', content: 'OK'});
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
    selector: 'jhi-assetrecordtype-popup',
    template: ''
})
export class AssetrecordtypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetrecordtypePopupService: AssetrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetrecordtypePopupService
                    .open(AssetrecordtypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetrecordtypePopupService
                    .open(AssetrecordtypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
