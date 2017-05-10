import { Assetassetmbr } from '../assetassetmbr';
import { Modelrecordtype } from '../modelrecordtype';
export class Model {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public assetassetmbr?: Assetassetmbr,
        public modelrecordtype?: Modelrecordtype,
    ) {
    }
}
