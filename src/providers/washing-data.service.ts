import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BasicService } from './basic.service';
import { IWashingData } from '../interfaces/washing-data.interface';
import { IServerResponse } from '../interfaces/server-response.interface';

@Injectable()
export class WashingDataService extends BasicService {
    private apiURL: string = 'http://icw.tracker/washingData.php';
    public data: IWashingData[] = [];

    constructor(private http: Http) {
        super();
    }

    public getWashingData(date: string): Observable<IServerResponse<IWashingData[]>> {
        return this.http.get(`${this.apiURL}?date=${date}`)
            .map(this.extractData)
            .catch(this.catchError);
    }

    public addWashingData(washingData: IWashingData): Observable<IServerResponse<IWashingData>> {
        const body = `carID=${washingData.carID}&boxID=${washingData.boxID}&prices=${JSON.stringify(washingData.prices)}&totalPrice=${washingData.totalPrice}`;
        const headers = new Headers({
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8' 
        });
        const requestOptions = new RequestOptions({
            headers: headers
        });

        return this.http.post(this.apiURL, body, requestOptions)
            .map(this.extractData)
            .catch(this.catchError);

    }

    public removeWashingData(washingData: IWashingData): Observable<IServerResponse<IWashingData>> {
        return this.http.delete(`${this.apiURL}?id=${washingData.id}`)
            .map(this.extractData)
            .catch(this.catchError);
    }
    
    public updateWashingData(washingData: IWashingData): Observable<IServerResponse<IWashingData>> {
        const body = `id=${washingData.id}&carID=${washingData.carID}&boxID=${washingData.boxID}&prices=${JSON.stringify(washingData.prices)}&totalPrice=${washingData.totalPrice}`;
        const requestOptions = new Headers({
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8' 
        });
        console.log(body);
        return this.http.put(`${this.apiURL}?id=${washingData.id}`, body, requestOptions)
            .map(this.extractData)
            .catch(this.catchError);
    }
}