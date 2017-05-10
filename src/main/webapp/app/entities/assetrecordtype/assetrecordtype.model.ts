import { Asset } from '../asset';
export class Assetrecordtype {
    constructor(
        public id?: number,
        public name?: string,
        public nameshort?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public asset?: Asset,
    ) {
    }
}
