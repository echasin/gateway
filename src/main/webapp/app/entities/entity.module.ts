import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayAssetassetmbrModule } from './assetassetmbr/assetassetmbr.module';
import { GatewayAssetModule } from './asset/asset.module';
import { GatewayAssetrecordtypeModule } from './assetrecordtype/assetrecordtype.module';
import { GatewayModelModule } from './model/model.module';
import { GatewayModelrecordtypeModule } from './modelrecordtype/modelrecordtype.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayAssetassetmbrModule,
        GatewayAssetModule,
        GatewayAssetrecordtypeModule,
        GatewayModelModule,
        GatewayModelrecordtypeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
