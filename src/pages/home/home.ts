import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WashingDataService } from '../../providers/washing-data.service';
import { ViewWashingDataPage } from '../view-washing-data/view-washing-data';
import { IServerResponse } from '../interfaces/server-response.interface';
import { IWashingData } from '../interfaces/washing-data.interface';

@Component({
    templateUrl: 'home.html'
})
export class HomePage {
    private viewWashingDataPage = ViewWashingDataPage;
    private washingDataDate: string;
    private currentDate: string;
    
    constructor(private navCtrl: NavController, private washingDataService: WashingDataService) {
        this.initFilterByDate();
        this.getWashingData(this.currentDate);
    }

    private initFilterByDate(): void {
        const currentDate = new Date();
        const ISODate = currentDate.toISOString();

        this.washingDataDate = ISODate;
        this.currentDate = ISODate;
    }
    
    private getWashingData(date: string) {
        console.log(this.washingDataService.getWashingData(date));
        this.washingDataService.getWashingData(date)
            .subscribe((res) => {
                if (res.status === 'success') {
                    this.washingDataService.data = res.data;
                }
                else {
                    this.washingDataService.onApiError(res.statusText);
                }
            }, this.washingDataService.onApiError);
    }
}
