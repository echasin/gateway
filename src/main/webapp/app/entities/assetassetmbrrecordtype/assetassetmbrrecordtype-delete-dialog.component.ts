import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Assetassetmbrrecordtype } from './assetassetmbrrecordtype.model';
import { AssetassetmbrrecordtypePopupService } from './assetassetmbrrecordtype-popup.service';
import { AssetassetmbrrecordtypeService } from './assetassetmbrrecordtype.service';

@Component({
    selector: 'jhi-assetassetmbrrecordtype-delete-dialog',
    templateUrl: './assetassetmbrrecordtype-delete-dialog.component.html'
})
export class AssetassetmbrrecordtypeDeleteDialogComponent {

    assetassetmbrrecordtype: Assetassetmbrrecordtype;

    constructor(
        private assetassetmbrrecordtypeService: AssetassetmbrrecordtypeService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetassetmbrrecordtypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetassetmbrrecordtypeListModification',
                content: 'Deleted an assetassetmbrrecordtype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assetassetmbrrecordtype-delete-popup',
    template: ''
})
export class AssetassetmbrrecordtypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetassetmbrrecordtypePopupService: AssetassetmbrrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.assetassetmbrrecordtypePopupService
                .open(AssetassetmbrrecordtypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
