import { Asset } from '../asset';
import { Model } from '../model';
export class Assetassetmbr {
    constructor(
        public id?: number,
        public comment?: string,
        public xcoordinate?: number,
        public ycoordinate?: number,
        public parentinstance?: string,
        public childinstance?: string,
        public nameshort?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public parentasset?: Asset,
        public childasset?: Asset,
        public model?: Model,
    ) {
    }
}
