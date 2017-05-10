import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Modelrecordtype } from './modelrecordtype.model';
import { ModelrecordtypePopupService } from './modelrecordtype-popup.service';
import { ModelrecordtypeService } from './modelrecordtype.service';

@Component({
    selector: 'jhi-modelrecordtype-delete-dialog',
    templateUrl: './modelrecordtype-delete-dialog.component.html'
})
export class ModelrecordtypeDeleteDialogComponent {

    modelrecordtype: Modelrecordtype;

    constructor(
        private modelrecordtypeService: ModelrecordtypeService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modelrecordtypeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modelrecordtypeListModification',
                content: 'Deleted an modelrecordtype'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modelrecordtype-delete-popup',
    template: ''
})
export class ModelrecordtypeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modelrecordtypePopupService: ModelrecordtypePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.modelrecordtypePopupService
                .open(ModelrecordtypeDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
