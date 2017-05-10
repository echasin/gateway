import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModelService,
    ModelPopupService,
    ModelComponent,
    ModelDetailComponent,
    ModelDialogComponent,
    ModelPopupComponent,
    ModelDeletePopupComponent,
    ModelDeleteDialogComponent,
    modelRoute,
    modelPopupRoute,
    ModelResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...modelRoute,
    ...modelPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModelComponent,
        ModelDetailComponent,
        ModelDialogComponent,
        ModelDeleteDialogComponent,
        ModelPopupComponent,
        ModelDeletePopupComponent,
    ],
    entryComponents: [
        ModelComponent,
        ModelDialogComponent,
        ModelPopupComponent,
        ModelDeleteDialogComponent,
        ModelDeletePopupComponent,
    ],
    providers: [
        ModelService,
        ModelPopupService,
        ModelResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModelModule {}
