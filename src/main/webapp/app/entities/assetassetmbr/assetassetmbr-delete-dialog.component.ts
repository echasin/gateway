import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Assetassetmbr } from './assetassetmbr.model';
import { AssetassetmbrPopupService } from './assetassetmbr-popup.service';
import { AssetassetmbrService } from './assetassetmbr.service';

@Component({
    selector: 'jhi-assetassetmbr-delete-dialog',
    templateUrl: './assetassetmbr-delete-dialog.component.html'
})
export class AssetassetmbrDeleteDialogComponent {

    assetassetmbr: Assetassetmbr;

    constructor(
        private assetassetmbrService: AssetassetmbrService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetassetmbrService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetassetmbrListModification',
                content: 'Deleted an assetassetmbr'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assetassetmbr-delete-popup',
    template: ''
})
export class AssetassetmbrDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetassetmbrPopupService: AssetassetmbrPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.assetassetmbrPopupService
                .open(AssetassetmbrDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
