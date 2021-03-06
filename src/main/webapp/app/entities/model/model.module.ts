import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModelService,
    ModelPopupService,
    ModelComponent,
    ModelDetailComponent,
    EditModelAsset,
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
        EditModelAsset,
        ModelDeleteDialogComponent,
        ModelPopupComponent,
        ModelDeletePopupComponent,
    ],
    entryComponents: [
        ModelComponent,
        ModelDialogComponent,
        ModelPopupComponent,
        EditModelAsset,
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
