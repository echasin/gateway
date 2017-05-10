import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AssetrecordtypeComponent } from './assetrecordtype.component';
import { AssetrecordtypeDetailComponent } from './assetrecordtype-detail.component';
import { AssetrecordtypePopupComponent } from './assetrecordtype-dialog.component';
import { AssetrecordtypeDeletePopupComponent } from './assetrecordtype-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class AssetrecordtypeResolvePagingParams implements Resolve<any> {

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

export const assetrecordtypeRoute: Routes = [
    {
        path: 'assetrecordtype',
        component: AssetrecordtypeComponent,
        resolve: {
            'pagingParams': AssetrecordtypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assetrecordtype/:id',
        component: AssetrecordtypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetrecordtypePopupRoute: Routes = [
    {
        path: 'assetrecordtype-new',
        component: AssetrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetrecordtype/:id/edit',
        component: AssetrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetrecordtype/:id/delete',
        component: AssetrecordtypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
