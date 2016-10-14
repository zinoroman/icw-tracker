import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WashingDataFormComponent } from '../../components/washing-data-form/washing-data-form.component';
import { IWashingData } from '../../interfaces/washing-data.interface';

/*
Generated class for the EditWashingDataPage page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    templateUrl: 'edit-washing-data.html'
})
export class EditWashingDataPage {
    private washingData: IWashingData;
    
    constructor(private navCtrl: NavController, private navParams: NavParams) {
        this.washingData = this.navParams.get('washingData');
    }

}
