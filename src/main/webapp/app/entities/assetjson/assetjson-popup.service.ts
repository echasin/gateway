import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Assetjson } from './assetjson.model';
import { AssetjsonService } from './assetjson.service';
@Injectable()
export class AssetjsonPopupService {
    private isOpen = false;
    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private assetjsonService: AssetjsonService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.assetjsonService.find(id).subscribe((assetjson) => {
                assetjson.lastmodifieddatetime = this.datePipe
                    .transform(assetjson.lastmodifieddatetime, 'yyyy-MM-ddThh:mm');
                this.assetjsonModalRef(component, assetjson);
            });
        } else {
            return this.assetjsonModalRef(component, new Assetjson());
        }
    }

    assetjsonModalRef(component: Component, assetjson: Assetjson): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assetjson = assetjson;
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
