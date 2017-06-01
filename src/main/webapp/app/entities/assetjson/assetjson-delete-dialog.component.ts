import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Assetjson } from './assetjson.model';
import { AssetjsonPopupService } from './assetjson-popup.service';
import { AssetjsonService } from './assetjson.service';

@Component({
    selector: 'jhi-assetjson-delete-dialog',
    templateUrl: './assetjson-delete-dialog.component.html'
})
export class AssetjsonDeleteDialogComponent {

    assetjson: Assetjson;

    constructor(
        private assetjsonService: AssetjsonService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assetjsonService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assetjsonListModification',
                content: 'Deleted an assetjson'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assetjson-delete-popup',
    template: ''
})
export class AssetjsonDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assetjsonPopupService: AssetjsonPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.assetjsonPopupService
                .open(AssetjsonDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
