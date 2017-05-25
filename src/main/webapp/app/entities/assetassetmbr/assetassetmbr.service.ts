import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Assetassetmbr } from './assetassetmbr.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class AssetassetmbrService {

    private resourceUrl = 'asset/api/assetassetmbrs';
    private resourceSearchUrl = 'asset/api/_search/assetassetmbrs';
    private assetassetmbrbymodelUrl = 'asset/api/assetassetmbrbymodel';
    
    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(assetassetmbr: Assetassetmbr): Observable<Assetassetmbr> {
        const copy = this.convert(assetassetmbr);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(assetassetmbr: Assetassetmbr): Observable<Assetassetmbr> {
        const copy = this.convert(assetassetmbr);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Assetassetmbr> {
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
    
    loadAssetassetmbr(id: number): Observable<Response> {
      //  const options = this.createRequestOption(req);
        return this.http.get(`${this.assetassetmbrbymodelUrl}/${id}`)
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

    private convert(assetassetmbr: Assetassetmbr): Assetassetmbr {
        const copy: Assetassetmbr = Object.assign({}, assetassetmbr);

        copy.lastmodifieddatetime = this.dateUtils.toDate(assetassetmbr.lastmodifieddatetime);
        return copy;
    }
}
