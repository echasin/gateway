import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ModelrecordtypeComponent } from './modelrecordtype.component';
import { ModelrecordtypeDetailComponent } from './modelrecordtype-detail.component';
import { ModelrecordtypePopupComponent } from './modelrecordtype-dialog.component';
import { ModelrecordtypeDeletePopupComponent } from './modelrecordtype-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ModelrecordtypeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const modelrecordtypeRoute: Routes = [
    {
        path: 'modelrecordtype',
        component: ModelrecordtypeComponent,
        resolve: {
            'pagingParams': ModelrecordtypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modelrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'modelrecordtype/:id',
        component: ModelrecordtypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modelrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelrecordtypePopupRoute: Routes = [
    {
        path: 'modelrecordtype-new',
        component: ModelrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modelrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modelrecordtype/:id/edit',
        component: ModelrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modelrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'modelrecordtype/:id/delete',
        component: ModelrecordtypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.modelrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
