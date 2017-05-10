import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from '../../shared';
import {
    AssetrecordtypeService,
    AssetrecordtypePopupService,
    AssetrecordtypeComponent,
    AssetrecordtypeDetailComponent,
    AssetrecordtypeDialogComponent,
    AssetrecordtypePopupComponent,
    AssetrecordtypeDeletePopupComponent,
    AssetrecordtypeDeleteDialogComponent,
    assetrecordtypeRoute,
    assetrecordtypePopupRoute,
    AssetrecordtypeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...assetrecordtypeRoute,
    ...assetrecordtypePopupRoute,
];

@NgModule({
    imports: [
        GatewaySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AssetrecordtypeComponent,
        AssetrecordtypeDetailComponent,
        AssetrecordtypeDialogComponent,
        AssetrecordtypeDeleteDialogComponent,
        AssetrecordtypePopupComponent,
        AssetrecordtypeDeletePopupComponent,
    ],
    entryComponents: [
        AssetrecordtypeComponent,
        AssetrecordtypeDialogComponent,
        AssetrecordtypePopupComponent,
        AssetrecordtypeDeleteDialogComponent,
        AssetrecordtypeDeletePopupComponent,
    ],
    providers: [
        AssetrecordtypeService,
        AssetrecordtypePopupService,
        AssetrecordtypeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayAssetrecordtypeModule {}
