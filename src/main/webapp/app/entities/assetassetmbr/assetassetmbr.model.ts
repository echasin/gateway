import { Assetassetmbrrecordtype } from '../assetassetmbrrecordtype';
import { Asset } from '../asset';
import { Model } from '../model';
export class Assetassetmbr {
    constructor(
        public id?: number,
        public comment?: string,
        public parentxcoordinate?: number,
        public parentycoordinate?: number,
        public childxcoordinate?: number,
        public childycoordinate?: number,
        public parentinstance?: string,
        public childinstance?: string,
        public nameshort?: string,
        public description?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public assetassetmbrrecordtype?: Assetassetmbrrecordtype,
        public parentasset?: Asset,
        public childasset?: Asset,
        public model?: Model,
    ) {
    }
}
