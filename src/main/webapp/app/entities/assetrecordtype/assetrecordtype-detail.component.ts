import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Assetrecordtype } from './assetrecordtype.model';
import { AssetrecordtypeService } from './assetrecordtype.service';

@Component({
    selector: 'jhi-assetrecordtype-detail',
    templateUrl: './assetrecordtype-detail.component.html'
})
export class AssetrecordtypeDetailComponent implements OnInit, OnDestroy {

    assetrecordtype: Assetrecordtype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private assetrecordtypeService: AssetrecordtypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssetrecordtypes();
    }

    load(id) {
        this.assetrecordtypeService.find(id).subscribe((assetrecordtype) => {
            this.assetrecordtype = assetrecordtype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssetrecordtypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assetrecordtypeListModification',
            (response) => this.load(this.assetrecordtype.id)
        );
    }
}
