import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Assetassetmbr } from './assetassetmbr.model';
import { AssetassetmbrPopupService } from './assetassetmbr-popup.service';
import { AssetassetmbrService } from './assetassetmbr.service';
import { Assetassetmbrrecordtype, AssetassetmbrrecordtypeService } from '../assetassetmbrrecordtype';
import { Asset, AssetService } from '../asset';
import { Model, ModelService } from '../model';

@Component({
    selector: 'jhi-assetassetmbr-dialog',
    templateUrl: './assetassetmbr-dialog.component.html'
})
export class AssetassetmbrDialogComponent implements OnInit {

    assetassetmbr: Assetassetmbr;
    authorities: any[];
    isSaving: boolean;

    assetassetmbrrecordtypes: Assetassetmbrrecordtype[];

    assets: Asset[];

    models: Model[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private assetassetmbrService: AssetassetmbrService,
        private assetassetmbrrecordtypeService: AssetassetmbrrecordtypeService,
        private assetService: AssetService,
        private modelService: ModelService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.assetassetmbrrecordtypeService.query().subscribe(
            (res: Response) => { this.assetassetmbrrecordtypes = res.json(); }, (res: Response) => this.onError(res.json()));
        this.assetService.query().subscribe(
            (res: Response) => { this.assets = res.json(); }, (res: Response) => this.onError(res.json()));
        this.modelService.query().subscribe(
            (res: Response) => { this.models = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.assetassetmbr.id !== undefined) {
            this.subscribeToSaveResponse(
                this.assetassetmbrService.update(this.assetassetmbr));
        } else {
            this.subscribeToSaveResponse(
                this.assetassetmbrService.create(this.assetassetmbr));
        }
    }

    private subscribeToSaveResponse(result: Observable<Assetassetmbr>) {
        result.subscribe((res: Assetassetmbr) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Assetassetmbr) {
        this.eventManager.broadcast({ name: 'assetassetmbrListModification', content: 'OK'});
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

    trackAssetassetmbrrecordtypeById(index: number, item: Assetassetmbrrecordtype) {
        return item.id;
    }

    trackAssetById(index: number, item: Asset) {
        return item.id;
    }

    trackModelById(index: number, item: Model) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-assetassetmbr-popup',
    template: ''
})
export class AssetassetmbrPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetassetmbrPopupService: AssetassetmbrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.assetassetmbrPopupService
                    .open(AssetassetmbrDialogComponent, params['id']);
            } else {
                this.modalRef = this.assetassetmbrPopupService
                    .open(AssetassetmbrDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
