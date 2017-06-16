import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { Assetassetmbr } from './assetassetmbr.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AssetassetmbrService {

    private resourceUrl = 'asset/api/assetassetmbrs';
    private resourceSearchUrl = 'asset/api/_search/assetassetmbrs';
    private assetassetmbrbymodelUrl = 'asset/api/assetassetmbrbymodel';
    private assetassetmbrbyByInstanceUrl= 'asset/api/assetassetmbrByInstance';
    
    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(assetassetmbr: Assetassetmbr): Observable<Assetassetmbr> {
        const copy = this.convert(assetassetmbr);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(assetassetmbr: Assetassetmbr): Observable<Assetassetmbr> {
        const copy = this.convert(assetassetmbr);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Assetassetmbr> {
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
    
    loadAssetassetmbr(id: number): Observable<Response> {
        return this.http.get(`${this.assetassetmbrbymodelUrl}/${id}`)
            .map((res: Response) => this.convertResponse(res))
        ;
    }
    
    loadAssetassetmbrByInstance(parent: any,child:any): Observable<Response> {
        return this.http.get(`${this.assetassetmbrbyByInstanceUrl}/${parent}/${child}`)
            .map((res: Response) => this.convertResponse(res))
        ;
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

    private convert(assetassetmbr: Assetassetmbr): Assetassetmbr {
        const copy: Assetassetmbr = Object.assign({}, assetassetmbr);

        copy.lastmodifieddatetime = this.dateUtils.toDate(assetassetmbr.lastmodifieddatetime);
        return copy;
    }
}
