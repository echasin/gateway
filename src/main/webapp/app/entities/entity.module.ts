import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayAssetModule } from './asset/asset.module';
import { GatewayAssetassetmbrModule } from './assetassetmbr/assetassetmbr.module';
import { GatewayAssetjsonModule } from './assetjson/assetjson.module';
import { GatewayAssetassetmbrrecordtypeModule } from './assetassetmbrrecordtype/assetassetmbrrecordtype.module';
import { GatewayAssetrecordtypeModule } from './assetrecordtype/assetrecordtype.module';
import { GatewayModelModule } from './model/model.module';
import { GatewayModelrecordtypeModule } from './modelrecordtype/modelrecordtype.module';
import { GatewayReportModule } from './report/report.module';
import { GatewayReportparameterModule } from './reportparameter/reportparameter.module';

/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [

        GatewayAssetModule,
        GatewayAssetassetmbrModule,
        GatewayAssetassetmbrrecordtypeModule,
        GatewayAssetrecordtypeModule,
        GatewayAssetjsonModule,
        GatewayModelModule,
        GatewayModelrecordtypeModule,
        GatewayReportModule,
        GatewayReportparameterModule,
        GatewayReportModule,
      
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
