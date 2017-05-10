import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Modelrecordtype } from './modelrecordtype.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class ModelrecordtypeService {

    private resourceUrl = 'asset/api/modelrecordtypes';
    private resourceSearchUrl = 'asset/api/_search/modelrecordtypes';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(modelrecordtype: Modelrecordtype): Observable<Modelrecordtype> {
        const copy = this.convert(modelrecordtype);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(modelrecordtype: Modelrecordtype): Observable<Modelrecordtype> {
        const copy = this.convert(modelrecordtype);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Modelrecordtype> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            jsonResponse.lastmodifieddatetime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.lastmodifieddatetime);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        const options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    private convertResponse(res: Response): Response {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].lastmodifieddatetime = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].lastmodifieddatetime);
        }
        res.json().data = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        const options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            const params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }

    private convert(modelrecordtype: Modelrecordtype): Modelrecordtype {
        const copy: Modelrecordtype = Object.assign({}, modelrecordtype);

        copy.lastmodifieddatetime = this.dateUtils.toDate(modelrecordtype.lastmodifieddatetime);
        return copy;
    }
}
