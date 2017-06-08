import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Assetjson } from './assetjson.model';
import { AssetjsonService } from './assetjson.service';

@Component({
    selector: 'jhi-assetjson-detail',
    templateUrl: './assetjson-detail.component.html'
})
export class AssetjsonDetailComponent implements OnInit, OnDestroy {

    assetjson: Assetjson;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private assetjsonService: AssetjsonService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAssetjsons();
    }

    load(id) {
        this.assetjsonService.find(id).subscribe((assetjson) => {
            this.assetjson = assetjson;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssetjsons() {
        this.eventSubscriber = this.eventManager.subscribe(
            'assetjsonListModification',
            (response) => this.load(this.assetjson.id)
        );
    }
}
