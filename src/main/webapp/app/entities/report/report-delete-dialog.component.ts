import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Report } from './report.model';
import { ReportPopupService } from './report-popup.service';
import { ReportService } from './report.service';

@Component({
    selector: 'jhi-report-delete-dialog',
    templateUrl: './report-delete-dialog.component.html'
})
export class ReportDeleteDialogComponent {

    report: Report;

    constructor(
        private reportService: ReportService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reportService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reportListModification',
                content: 'Deleted an report'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-report-delete-popup',
    template: ''
})
export class ReportDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reportPopupService: ReportPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.reportPopupService
                .open(ReportDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
