import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AssetjsonService,
    AssetjsonPopupService,
    AssetjsonComponent,
    AssetjsonDetailComponent,
    AssetjsonDialogComponent,
    AssetjsonPopupComponent,
    AssetjsonDeletePopupComponent,
    AssetjsonDeleteDialogComponent,
    assetjsonRoute,
    assetjsonPopupRoute,
    AssetjsonResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...assetjsonRoute,
    ...assetjsonPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AssetjsonComponent,
        AssetjsonDetailComponent,
        AssetjsonDialogComponent,
        AssetjsonDeleteDialogComponent,
        AssetjsonPopupComponent,
        AssetjsonDeletePopupComponent,
    ],
    entryComponents: [
        AssetjsonComponent,
        AssetjsonDialogComponent,
        AssetjsonPopupComponent,
        AssetjsonDeleteDialogComponent,
        AssetjsonDeletePopupComponent,
    ],
    providers: [
        AssetjsonService,
        AssetjsonPopupService,
        AssetjsonResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAssetjsonModule {}
