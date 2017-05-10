import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Modelrecordtype } from './modelrecordtype.model';
import { ModelrecordtypeService } from './modelrecordtype.service';
@Injectable()
export class ModelrecordtypePopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private modelrecordtypeService: ModelrecordtypeService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.modelrecordtypeService.find(id).subscribe((modelrecordtype) => {
                modelrecordtype.lastmodifieddatetime = this.datePipe
                    .transform(modelrecordtype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.modelrecordtypeModalRef(component, modelrecordtype);
            });
        } else {
            return this.modelrecordtypeModalRef(component, new Modelrecordtype());
        }
    }

    modelrecordtypeModalRef(component: Component, modelrecordtype: Modelrecordtype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.modelrecordtype = modelrecordtype;
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
