import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Assetassetmbrrecordtype } from './assetassetmbrrecordtype.model';
import { AssetassetmbrrecordtypeService } from './assetassetmbrrecordtype.service';

@Component({
    selector: 'jhi-assetassetmbrrecordtype-detail',
    templateUrl: './assetassetmbrrecordtype-detail.component.html'
})
export class AssetassetmbrrecordtypeDetailComponent implements OnInit, OnDestroy {

    assetassetmbrrecordtype: Assetassetmbrrecordtype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private assetassetmbrrecordtypeService: AssetassetmbrrecordtypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssetassetmbrrecordtypes();
    }

    load(id) {
        this.assetassetmbrrecordtypeService.find(id).subscribe((assetassetmbrrecordtype) => {
            this.assetassetmbrrecordtype = assetassetmbrrecordtype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssetassetmbrrecordtypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assetassetmbrrecordtypeListModification',
            (response) => this.load(this.assetassetmbrrecordtype.id)
        );
    }
}
