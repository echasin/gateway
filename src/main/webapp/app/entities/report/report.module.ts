import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ReportService,
    ReportPopupService,
    ReportComponent,
    ReportDetailComponent,
    ReportDialogComponent,
    ReportPopupComponent,
    ReportDeletePopupComponent,
    ReportDeleteDialogComponent,
    reportRoute,
    reportPopupRoute,
    ReportResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reportRoute,
    ...reportPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReportComponent,
        ReportDetailComponent,
        ReportDialogComponent,
        ReportDeleteDialogComponent,
        ReportPopupComponent,
        ReportDeletePopupComponent,
    ],
    entryComponents: [
        ReportComponent,
        ReportDialogComponent,
        ReportPopupComponent,
        ReportDeleteDialogComponent,
        ReportDeletePopupComponent,
    ],
    providers: [
        ReportService,
        ReportPopupService,
        ReportResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayReportModule {}
