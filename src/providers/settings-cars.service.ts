import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IServerResponse } from '../interfaces/server-response.interface';
import { ICar } from '../interfaces/car.interface';
import { BasicService } from './basic.service';

@Injectable()
export class SettingsCarsService extends BasicService {
    private apiURL: string = `${this.apiBaseURL}/test.php`;
    public data: ICar[] = [];

    constructor(private http: Http) {
        super();
        this.init();
    }

    private init() {
        this.getCars()
            .subscribe((res) => {
                if (res.status === 'success') {
                    this.data = res.data;
                }
                else if (res.status === 'error') {
                    this.onApiError(res.statusText);
                }
            }, this.onApiError);
    }

    private getCars(): Observable<IServerResponse<ICar[]>> {
        return this.http.get(this.apiURL)
            .map(this.extractData)
            .catch(this.catchError);
    }

    public addCar(car): Observable<IServerResponse<ICar>> {
        const body = `brand=${car.brand}`;
        const headers = new Headers({
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8' 
        });
        const options = new RequestOptions({
            headers: headers
        });

        return this.http.post(this.apiURL, body, options)
            .map(this.extractData)
            .catch(this.catchError);
    }

    public removeCar(car: ICar): Observable<IServerResponse<ICar>> {
        return this.http.delete(`${this.apiURL}?id=${car.id}`)
            .map(this.extractData)
            .catch(this.catchError);
    }
}
