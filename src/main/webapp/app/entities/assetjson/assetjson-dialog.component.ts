import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Assetjson } from './assetjson.model';
import { AssetjsonPopupService } from './assetjson-popup.service';
import { AssetjsonService } from './assetjson.service';
import { Asset, AssetService } from '../asset';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-assetjson-dialog',
    templateUrl: './assetjson-dialog.component.html'
})
export class AssetjsonDialogComponent implements OnInit {

    assetjson: Assetjson;
    authorities: any[];
    isSaving: boolean;

    assets: Asset[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private assetjsonService: AssetjsonService,
        private assetService: AssetService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.assetService.query()
            .subscribe((res: ResponseWrapper) => { this.assets = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assetjson.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assetjsonService.update(this.assetjson));
        } else {
            this.subscribeToSaveResponse(
                this.assetjsonService.create(this.assetjson));
        }
    }

    private subscribeToSaveResponse(result: Observable<Assetjson>) {
        result.subscribe((res: Assetjson) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Assetjson) {
        this.eventManager.broadcast({ name: 'assetjsonListModification', content: 'OK'});
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

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-assetjson-popup',
    template: ''
})
export class AssetjsonPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetjsonPopupService: AssetjsonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetjsonPopupService
                    .open(AssetjsonDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetjsonPopupService
                    .open(AssetjsonDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
