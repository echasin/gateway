import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Assetrecordtype } from './assetrecordtype.model';
import { AssetrecordtypePopupService } from './assetrecordtype-popup.service';
import { AssetrecordtypeService } from './assetrecordtype.service';

@Component({
    selector: 'jhi-assetrecordtype-delete-dialog',
    templateUrl: './assetrecordtype-delete-dialog.component.html'
})
export class AssetrecordtypeDeleteDialogComponent {

    assetrecordtype: Assetrecordtype;

    constructor(
        private assetrecordtypeService: AssetrecordtypeService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetrecordtypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetrecordtypeListModification',
                content: 'Deleted an assetrecordtype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assetrecordtype-delete-popup',
    template: ''
})
export class AssetrecordtypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetrecordtypePopupService: AssetrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.assetrecordtypePopupService
                .open(AssetrecordtypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
