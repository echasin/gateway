import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Assetrecordtype } from './assetrecordtype.model';
import { AssetrecordtypeService } from './assetrecordtype.service';
@Injectable()
export class AssetrecordtypePopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private assetrecordtypeService: AssetrecordtypeService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.assetrecordtypeService.find(id).subscribe((assetrecordtype) => {
                assetrecordtype.lastmodifieddatetime = this.datePipe
                    .transform(assetrecordtype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.assetrecordtypeModalRef(component, assetrecordtype);
            });
        } else {
            return this.assetrecordtypeModalRef(component, new Assetrecordtype());
        }
    }

    assetrecordtypeModalRef(component: Component, assetrecordtype: Assetrecordtype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assetrecordtype = assetrecordtype;
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
