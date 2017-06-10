import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ReportparameterService,
    ReportparameterPopupService,
    ReportparameterComponent,
    ReportparameterDetailComponent,
    ReportparameterDialogComponent,
    ReportparameterPopupComponent,
    ReportparameterDeletePopupComponent,
    ReportparameterDeleteDialogComponent,
    reportparameterRoute,
    reportparameterPopupRoute,
    ReportparameterResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...reportparameterRoute,
    ...reportparameterPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ReportparameterComponent,
        ReportparameterDetailComponent,
        ReportparameterDialogComponent,
        ReportparameterDeleteDialogComponent,
        ReportparameterPopupComponent,
        ReportparameterDeletePopupComponent,
    ],
    entryComponents: [
        ReportparameterComponent,
        ReportparameterDialogComponent,
        ReportparameterPopupComponent,
        ReportparameterDeleteDialogComponent,
        ReportparameterDeletePopupComponent,
    ],
    providers: [
        ReportparameterService,
        ReportparameterPopupService,
        ReportparameterResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayReportparameterModule {}
