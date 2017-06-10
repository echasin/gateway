import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Reportparameter } from './reportparameter.model';
import { ReportparameterService } from './reportparameter.service';
@Injectable()
export class ReportparameterPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private reportparameterService: ReportparameterService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.reportparameterService.find(id).subscribe((reportparameter) => {
                reportparameter.lastmodifieddatetime = this.datePipe
                    .transform(reportparameter.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.reportparameterModalRef(component, reportparameter);
            });
        } else {
            return this.reportparameterModalRef(component, new Reportparameter());
        }
    }

    reportparameterModalRef(component: Component, reportparameter: Reportparameter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.reportparameter = reportparameter;
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
