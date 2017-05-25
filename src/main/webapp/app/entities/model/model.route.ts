import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ModelComponent } from './model.component';
import { ModelDetailComponent } from './model-detail.component';
import { EditAttackTree } from './edit-attacktree.component';
import { ModelPopupComponent } from './model-dialog.component';
import { ModelDeletePopupComponent } from './model-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ModelResolvePagingParams implements Resolve<any> {

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

export const modelRoute: Routes = [
    {
        path: 'model',
        component: ModelComponent,
        resolve: {
            'pagingParams': ModelResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'model/:id',
        component: ModelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'edit-attacktree/:id',
        component: EditAttackTree,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const modelPopupRoute: Routes = [
    {
        path: 'model-new',
        component: ModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model/:id/edit',
        component: ModelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'model/:id/delete',
        component: ModelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.model.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
