import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Asset } from './asset.model';
import { DateUtils } from 'ng-jhipster';

@Injectable()
export class AssetService {

    private resourceUrl = 'asset/api/assets';
    private resourceSearchUrl = 'asset/api/_search/assets';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(asset: Asset): Observable<Asset> {
        const copy = this.convert(asset);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(asset: Asset): Observable<Asset> {
        const copy = this.convert(asset);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Asset> {
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

    private convert(asset: Asset): Asset {
        const copy: Asset = Object.assign({}, asset);

        copy.lastmodifieddatetime = this.dateUtils.toDate(asset.lastmodifieddatetime);
        return copy;
    }
}
