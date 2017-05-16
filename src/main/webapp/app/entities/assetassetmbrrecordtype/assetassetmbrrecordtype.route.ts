import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AssetassetmbrrecordtypeComponent } from './assetassetmbrrecordtype.component';
import { AssetassetmbrrecordtypeDetailComponent } from './assetassetmbrrecordtype-detail.component';
import { AssetassetmbrrecordtypePopupComponent } from './assetassetmbrrecordtype-dialog.component';
import { AssetassetmbrrecordtypeDeletePopupComponent } from './assetassetmbrrecordtype-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class AssetassetmbrrecordtypeResolvePagingParams implements Resolve<any> {

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

export const assetassetmbrrecordtypeRoute: Routes = [
    {
        path: 'assetassetmbrrecordtype',
        component: AssetassetmbrrecordtypeComponent,
        resolve: {
            'pagingParams': AssetassetmbrrecordtypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbrrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assetassetmbrrecordtype/:id',
        component: AssetassetmbrrecordtypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbrrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetassetmbrrecordtypePopupRoute: Routes = [
    {
        path: 'assetassetmbrrecordtype-new',
        component: AssetassetmbrrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbrrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetassetmbrrecordtype/:id/edit',
        component: AssetassetmbrrecordtypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbrrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetassetmbrrecordtype/:id/delete',
        component: AssetassetmbrrecordtypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbrrecordtype.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
