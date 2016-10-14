import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IWashingData } from '../../interfaces/washing-data.interface';
import { EditWashingDataPage } from '../edit-washing-data/edit-washing-data';

/*
Generated class for the ViewWashingDataPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    templateUrl: 'view-washing-data.html'
})
export class ViewWashingDataPage {
    private editWashingDataPage = EditWashingDataPage;
    private washingData: IWashingData;

    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.washingData = this.navParams.get('washingData');
    }
}
