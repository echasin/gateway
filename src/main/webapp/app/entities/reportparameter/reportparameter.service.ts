import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Reportparameter } from './reportparameter.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReportparameterService {

    private resourceUrl = 'report/api/reportparameters';
    private resourceSearchUrl = 'report/api/_search/reportparameters';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(reportparameter: Reportparameter): Observable<Reportparameter> {
        const copy = this.convert(reportparameter);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(reportparameter: Reportparameter): Observable<Reportparameter> {
        const copy = this.convert(reportparameter);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Reportparameter> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convertItemFromServer(entity: any) {
        entity.lastmodifieddatetime = this.dateUtils
            .convertDateTimeFromServer(entity.lastmodifieddatetime);
    }

    private convert(reportparameter: Reportparameter): Reportparameter {
        const copy: Reportparameter = Object.assign({}, reportparameter);

        copy.lastmodifieddatetime = this.dateUtils.toDate(reportparameter.lastmodifieddatetime);
        return copy;
    }
}
