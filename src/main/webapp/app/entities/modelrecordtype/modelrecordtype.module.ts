import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    ModelrecordtypeService,
    ModelrecordtypePopupService,
    ModelrecordtypeComponent,
    ModelrecordtypeDetailComponent,
    ModelrecordtypeDialogComponent,
    ModelrecordtypePopupComponent,
    ModelrecordtypeDeletePopupComponent,
    ModelrecordtypeDeleteDialogComponent,
    modelrecordtypeRoute,
    modelrecordtypePopupRoute,
    ModelrecordtypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...modelrecordtypeRoute,
    ...modelrecordtypePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ModelrecordtypeComponent,
        ModelrecordtypeDetailComponent,
        ModelrecordtypeDialogComponent,
        ModelrecordtypeDeleteDialogComponent,
        ModelrecordtypePopupComponent,
        ModelrecordtypeDeletePopupComponent,
    ],
    entryComponents: [
        ModelrecordtypeComponent,
        ModelrecordtypeDialogComponent,
        ModelrecordtypePopupComponent,
        ModelrecordtypeDeleteDialogComponent,
        ModelrecordtypeDeletePopupComponent,
    ],
    providers: [
        ModelrecordtypeService,
        ModelrecordtypePopupService,
        ModelrecordtypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayModelrecordtypeModule {}
