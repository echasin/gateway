import { Asset } from '../asset';
export class Assetjson {
    constructor(
        public id?: number,
        public arrayname?: string,
        public arraynameshort?: string,
        public description?: string,
        public details?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public asset?: Asset,
    ) {
    }
}
