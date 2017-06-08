import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { AssetjsonComponent } from './assetjson.component';
import { AssetjsonDetailComponent } from './assetjson-detail.component';
import { AssetjsonPopupComponent } from './assetjson-dialog.component';
import { AssetjsonDeletePopupComponent } from './assetjson-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class AssetjsonResolvePagingParams implements Resolve<any> {

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

export const assetjsonRoute: Routes = [
    {
        path: 'assetjson',
        component: AssetjsonComponent,
        resolve: {
            'pagingParams': AssetjsonResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'apprefactoryApp.assetjson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'assetjson/:id',
        component: AssetjsonDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'apprefactoryApp.assetjson.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assetjsonPopupRoute: Routes = [
    {
        path: 'assetjson-new',
        component: AssetjsonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'apprefactoryApp.assetjson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetjson/:id/edit',
        component: AssetjsonPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'apprefactoryApp.assetjson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'assetjson/:id/delete',
        component: AssetjsonDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'apprefactoryApp.assetjson.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
