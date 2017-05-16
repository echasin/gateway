import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Assetassetmbrrecordtype } from './assetassetmbrrecordtype.model';
import { AssetassetmbrrecordtypeService } from './assetassetmbrrecordtype.service';
@Injectable()
export class AssetassetmbrrecordtypePopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private assetassetmbrrecordtypeService: AssetassetmbrrecordtypeService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.assetassetmbrrecordtypeService.find(id).subscribe((assetassetmbrrecordtype) => {
                assetassetmbrrecordtype.lastmodifieddatetime = this.datePipe
                    .transform(assetassetmbrrecordtype.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.assetassetmbrrecordtypeModalRef(component, assetassetmbrrecordtype);
            });
        } else {
            return this.assetassetmbrrecordtypeModalRef(component, new Assetassetmbrrecordtype());
        }
    }

    assetassetmbrrecordtypeModalRef(component: Component, assetassetmbrrecordtype: Assetassetmbrrecordtype): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assetassetmbrrecordtype = assetassetmbrrecordtype;
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
