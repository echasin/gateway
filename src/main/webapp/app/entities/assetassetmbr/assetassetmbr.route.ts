import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AssetassetmbrComponent } from './assetassetmbr.component';
import { AssetassetmbrDetailComponent } from './assetassetmbr-detail.component';
import { AssetassetmbrPopupComponent } from './assetassetmbr-dialog.component';
import { AssetassetmbrDeletePopupComponent } from './assetassetmbr-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class AssetassetmbrResolvePagingParams implements Resolve<any> {

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

export const assetassetmbrRoute: Routes = [
    {
        path: 'assetassetmbr',
        component: AssetassetmbrComponent,
        resolve: {
            'pagingParams': AssetassetmbrResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assetassetmbr/:id',
        component: AssetassetmbrDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbr.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetassetmbrPopupRoute: Routes = [
    {
        path: 'assetassetmbr-new',
        component: AssetassetmbrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetassetmbr/:id/edit',
        component: AssetassetmbrPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetassetmbr/:id/delete',
        component: AssetassetmbrDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.assetassetmbr.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
