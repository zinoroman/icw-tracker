import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { ApiConfig } from '../config/api.config';

export class BasicService {
    protected apiBaseURL: string = ApiConfig.baseURL;

    protected extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    protected catchError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    }

    public onApiError (error: string) {
        console.error(error);
    }
}
