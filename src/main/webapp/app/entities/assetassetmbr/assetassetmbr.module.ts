import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AssetassetmbrService,
    AssetassetmbrPopupService,
    AssetassetmbrComponent,
    AssetassetmbrDetailComponent,
    AssetassetmbrDialogComponent,
    AssetassetmbrPopupComponent,
    AssetassetmbrDeletePopupComponent,
    AssetassetmbrDeleteDialogComponent,
    assetassetmbrRoute,
    assetassetmbrPopupRoute,
    AssetassetmbrResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...assetassetmbrRoute,
    ...assetassetmbrPopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AssetassetmbrComponent,
        AssetassetmbrDetailComponent,
        AssetassetmbrDialogComponent,
        AssetassetmbrDeleteDialogComponent,
        AssetassetmbrPopupComponent,
        AssetassetmbrDeletePopupComponent,
    ],
    entryComponents: [
        AssetassetmbrComponent,
        AssetassetmbrDialogComponent,
        AssetassetmbrPopupComponent,
        AssetassetmbrDeleteDialogComponent,
        AssetassetmbrDeletePopupComponent,
    ],
    providers: [
        AssetassetmbrService,
        AssetassetmbrPopupService,
        AssetassetmbrResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAssetassetmbrModule {}
