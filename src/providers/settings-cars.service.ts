import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
        this.getCars();
    }

    private getCars() {
        const getCarsRequest = this.http.get(this.apiURL)
            .map(this.extractData)
            .catch(this.catchError);

        getCarsRequest.subscribe((res) => {
            if (res.status === 'success') {
                this.data = res.data;   
            }
            else if (res.status === 'error') {
                this.onApiError(res.statusText);
            }
        }, this.onApiError);
    }

    public addCar(car) {
        const body = `brand=${car.brand}`;
        const headers = new Headers({
            'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8' 
        });
        const options = new RequestOptions({
            headers: headers
        });

        const postCarRequest = this.http.post(this.apiURL, body, options)
            .map(this.extractData)
            .catch(this.catchError);

        postCarRequest.subscribe((res) => {
            if (res.status === 'success') {
                this.data.unshift(res.data);
            }
            else if (res.status === 'error') {
                this.onApiError(res.statusText);
            }
        }, this.onApiError);
    }

    public removeCar(car: ICar) {
        const deleteCarRequest = this.http.delete(`${this.apiURL}?id=${car.id}`)
            .map(this.extractData)
            .catch(this.catchError);

        deleteCarRequest.subscribe((res) => {
            if (res.status === 'success') {
                this.data.splice(this.data.indexOf(car), 1);
            }
            else if (res.status === 'error') {
                this.onApiError(res.statusText);
            }
        }, this.onApiError);
    }
}
