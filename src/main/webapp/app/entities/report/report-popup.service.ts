import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Report } from './report.model';
import { ReportService } from './report.service';
@Injectable()
export class ReportPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reportService: ReportService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.reportService.find(id).subscribe((report) => {
                report.lastmodifieddatetime = this.datePipe
                    .transform(report.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.reportModalRef(component, report);
            });
        } else {
            return this.reportModalRef(component, new Report());
        }
    }

    reportModalRef(component: Component, report: Report): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.report = report;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
