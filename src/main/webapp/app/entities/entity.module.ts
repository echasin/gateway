import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayAssetModule } from './asset/asset.module';
import { GatewayAssetrecordtypeModule } from './assetrecordtype/assetrecordtype.module';
import { GatewayModelModule } from './model/model.module';
import { GatewayAssetassetmbrModule } from './assetassetmbr/assetassetmbr.module';
import { GatewayModelassetmbrModule } from './modelassetmbr/modelassetmbr.module';
import { GatewayModelrecordtypeModule } from './modelrecordtype/modelrecordtype.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayAssetModule,
        GatewayAssetrecordtypeModule,
        GatewayModelModule,
        GatewayAssetassetmbrModule,
        GatewayModelassetmbrModule,
        GatewayModelrecordtypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
