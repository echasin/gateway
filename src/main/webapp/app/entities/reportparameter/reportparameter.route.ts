import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ReportparameterComponent } from './reportparameter.component';
import { ReportparameterDetailComponent } from './reportparameter-detail.component';
import { ReportparameterPopupComponent } from './reportparameter-dialog.component';
import { ReportparameterDeletePopupComponent } from './reportparameter-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ReportparameterResolvePagingParams implements Resolve<any> {

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

export const reportparameterRoute: Routes = [
    {
        path: 'reportparameter',
        component: ReportparameterComponent,
        resolve: {
            'pagingParams': ReportparameterResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reportparameter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'reportparameter/:id',
        component: ReportparameterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reportparameter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reportparameterPopupRoute: Routes = [
    {
        path: 'reportparameter-new',
        component: ReportparameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reportparameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportparameter/:id/edit',
        component: ReportparameterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reportparameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'reportparameter/:id/delete',
        component: ReportparameterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.reportparameter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
