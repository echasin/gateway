import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Assetassetmbrrecordtype } from './assetassetmbrrecordtype.model';
import { AssetassetmbrrecordtypePopupService } from './assetassetmbrrecordtype-popup.service';
import { AssetassetmbrrecordtypeService } from './assetassetmbrrecordtype.service';

@Component({
    selector: 'jhi-assetassetmbrrecordtype-dialog',
    templateUrl: './assetassetmbrrecordtype-dialog.component.html'
})
export class AssetassetmbrrecordtypeDialogComponent implements OnInit {

    assetassetmbrrecordtype: Assetassetmbrrecordtype;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private assetassetmbrrecordtypeService: AssetassetmbrrecordtypeService,
        private eventManager: EventManager
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
        if (this.assetassetmbrrecordtype.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assetassetmbrrecordtypeService.update(this.assetassetmbrrecordtype));
        } else {
            this.subscribeToSaveResponse(
                this.assetassetmbrrecordtypeService.create(this.assetassetmbrrecordtype));
        }
    }

    private subscribeToSaveResponse(result: Observable<Assetassetmbrrecordtype>) {
        result.subscribe((res: Assetassetmbrrecordtype) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Assetassetmbrrecordtype) {
        this.eventManager.broadcast({ name: 'assetassetmbrrecordtypeListModification', content: 'OK'});
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
    selector: 'jhi-assetassetmbrrecordtype-popup',
    template: ''
})
export class AssetassetmbrrecordtypePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetassetmbrrecordtypePopupService: AssetassetmbrrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetassetmbrrecordtypePopupService
                    .open(AssetassetmbrrecordtypeDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetassetmbrrecordtypePopupService
                    .open(AssetassetmbrrecordtypeDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
