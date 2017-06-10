import { Report } from '../report';
export class Reportparameter {
    constructor(
        public id?: number,
        public label?: string,
        public instructions?: string,
        public datatype?: string,
        public required?: string,
        public minlength?: string,
        public maxlength?: string,
        public validation?: string,
        public status?: string,
        public lastmodifiedby?: string,
        public domain?: string,
        public lastmodifieddatetime?: any,
        public report?: Report,
    ) {
    }
}
