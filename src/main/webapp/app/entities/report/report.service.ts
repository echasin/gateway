import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Report } from './report.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ReportService {

    private resourceUrl = 'report/api/reports';
    private resourceSearchUrl = 'report/api/_search/reports';
    private parameterListUrl = 'report/api/parameterList';
    private generateReportUrl = 'report/api/generateReport';
    
    

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(report: Report): Observable<Report> {
        const copy = this.convert(report);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(report: Report): Observable<Report> {
        const copy = this.convert(report);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Report> {
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
    
    parameterList(reportId: number): Observable<Response> {
        return this.http.get(`${this.parameterListUrl}/${reportId}`);
    }
    
    generateReport(reportId: number,parameters: any): Observable<Response> {
        return this.http.get(`${this.generateReportUrl}/${reportId}/${parameters}`);
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

    private convert(report: Report): Report {
        const copy: Report = Object.assign({}, report);

        copy.lastmodifieddatetime = this.dateUtils.toDate(report.lastmodifieddatetime);
        return copy;
    }
}
