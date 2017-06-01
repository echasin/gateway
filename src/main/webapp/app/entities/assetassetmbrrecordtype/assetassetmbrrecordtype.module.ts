import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AssetassetmbrrecordtypeService,
    AssetassetmbrrecordtypePopupService,
    AssetassetmbrrecordtypeComponent,
    AssetassetmbrrecordtypeDetailComponent,
    AssetassetmbrrecordtypeDialogComponent,
    AssetassetmbrrecordtypePopupComponent,
    AssetassetmbrrecordtypeDeletePopupComponent,
    AssetassetmbrrecordtypeDeleteDialogComponent,
    assetassetmbrrecordtypeRoute,
    assetassetmbrrecordtypePopupRoute,
    AssetassetmbrrecordtypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...assetassetmbrrecordtypeRoute,
    ...assetassetmbrrecordtypePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AssetassetmbrrecordtypeComponent,
        AssetassetmbrrecordtypeDetailComponent,
        AssetassetmbrrecordtypeDialogComponent,
        AssetassetmbrrecordtypeDeleteDialogComponent,
        AssetassetmbrrecordtypePopupComponent,
        AssetassetmbrrecordtypeDeletePopupComponent,
    ],
    entryComponents: [
        AssetassetmbrrecordtypeComponent,
        AssetassetmbrrecordtypeDialogComponent,
        AssetassetmbrrecordtypePopupComponent,
        AssetassetmbrrecordtypeDeleteDialogComponent,
        AssetassetmbrrecordtypeDeletePopupComponent,
    ],
    providers: [
        AssetassetmbrrecordtypeService,
        AssetassetmbrrecordtypePopupService,
        AssetassetmbrrecordtypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAssetassetmbrrecordtypeModule {}
