import { Reportparameter } from '../reportparameter';
export class Report {
    constructor(
        public id?: number,
        public name?: string,
        public reporttemplatename?: string,
        public reportoutputtypecode?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public lastmodifieddatetime?: any,
        public domain?: string,
        public reportparameter?: Reportparameter,
    ) {
    }
}
