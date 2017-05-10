import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Modelrecordtype } from './modelrecordtype.model';
import { ModelrecordtypeService } from './modelrecordtype.service';

@Component({
    selector: 'jhi-modelrecordtype-detail',
    templateUrl: './modelrecordtype-detail.component.html'
})
export class ModelrecordtypeDetailComponent implements OnInit, OnDestroy {

    modelrecordtype: Modelrecordtype;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private modelrecordtypeService: ModelrecordtypeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModelrecordtypes();
    }

    load(id) {
        this.modelrecordtypeService.find(id).subscribe((modelrecordtype) => {
            this.modelrecordtype = modelrecordtype;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModelrecordtypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'modelrecordtypeListModification',
            (response) => this.load(this.modelrecordtype.id)
        );
    }
}
