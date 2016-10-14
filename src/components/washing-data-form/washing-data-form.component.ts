import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/customValidators';
import { WashingDataService } from '../../providers/washing-data.service';
import { SettingsCarsService } from '../../providers/settings-cars.service';
import { IWashingData, IWashingDataPrice } from '../../interfaces/washing-data.interface';
import { IServerResponse } from '../../interfaces/server-response.interface';
import { ViewWashingDataPage } from '../../pages/view-washing-data/view-washing-data';
import { HomePage } from '../../pages/home/home';

@Component({
    selector: 'washing-data-form',
    templateUrl: 'washing-data-form.component.html'
})
export class WashingDataFormComponent implements OnChanges {
    //Main component's form
    private formWashing: FormGroup;
    //State of form
    private submitAttempt: boolean;
    private errorAlert: Alert;
    //Page that will be shown if component's form will be submitted successfully
    private viewWashingDataPage = ViewWashingDataPage;
    private homePage = HomePage;
    @Input() washingData;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private washingDataService: WashingDataService, private alertCtrl: AlertController, private settingsCarsService: SettingsCarsService
        ) {
        this.initForm();
    }
    
    ngOnChanges(changes: SimpleChanges) {
        if (changes['washingData']) {
            //Values from DB about current washing
            this.formWashing.setValue({
                carID: this.washingData.carID,
                boxID: this.washingData.boxID,
                prices: this.washingData.prices
            }, {
                onlySelf: true
            });
        }
    }

    private initForm() {
        this.formWashing = this.formBuilder.group({
            //Car brand
            carID: ['', Validators.required],
            //Box ID
            boxID: ['', Validators.required],
            //Prices for washing
            prices: this.formBuilder.group({
                //Price for washing
                priceWashing: ['', Validators.minLength(1)],
                //Price for cleaning using vacuum cleaner
                priceVC: ['', Validators.minLength(1)],
                //Price for cleaning the engine
                priceEC: ['', Validators.minLength(1)],
                //Price for additional services
                priceAdditional: ['', Validators.minLength(1)]
            }, {
                validator: CustomValidators.washingPricesRequired
            })
        });
    }

    private showErrorAlert() {
        //This alert will be shown when submited form will be invalid
        this.errorAlert = this.alertCtrl.create({
            title: 'Помилка',
            subTitle: 'Будь ласка, перевірте правильність заповнення форми',
            buttons: ['Гаразд']
        });

        this.errorAlert.present();
    }

    //When user want to add info about washing
    private onSubmit(data) {
        this.submitAttempt = true;

        //Check is form valid
        if (this.formWashing.valid) {
            const formWashingValues = this.formWashing.value;
            formWashingValues.totalPrice = this.getTotalWashingPrice(formWashingValues.prices);
            
            if (this.washingData && this.washingData.id) {
                //Data about this washing is already in DB.
                //We need to make a PUT request
                formWashingValues.id = this.washingData.id;
                this.updateWashingData(formWashingValues);
            }
            else {
                this.addWashingData(formWashingValues);
            }
        }
        else {
            this.showErrorAlert();
        }
    }

    //Loops over `prices` summing up the values
    private getTotalWashingPrice(prices: string[]): number {
        let totalWashingPrice: number = 0;

        for (let key in prices) {
            //When user submits form we get the `string` values
            //so convert they to numbers
            const currentPrice: number = parseFloat(prices[key]);

            if (currentPrice) {
                //Add parsed value to total price
                totalWashingPrice += currentPrice;
            }
        }

        return totalWashingPrice;
    }

    private resetForm() {
        //Reset values of form's inputs
        this.formWashing.reset();
    }

    private addWashingData(formWashingValues) {
        this.washingDataService.addWashingData(formWashingValues).subscribe((res: IServerResponse<IWashingData>) => {
            if (res.status === 'success') {
                this.onSuccessAddWashingData(res);
            }
            else if (res.status === 'error') {
                this.washingDataService.onApiError(res.statusText);
            }
        }, this.washingDataService.onApiError);
    }

    private onSuccessAddWashingData(res: IServerResponse<IWashingData>) {
        //Add data to our service
        this.washingDataService.data.unshift(res.data);

        //Navigate to page with washing details
        this.navCtrl.setRoot(this.viewWashingDataPage, {
            washingData: res.data
        });

        this.resetForm();

        console.log(this.washingDataService);
        console.log(res.status, res.data);
    }

    private removeWashingData() {
        this.washingDataService.removeWashingData(this.washingData).subscribe((res: IServerResponse<any>) => {
            if (res.status === 'success') {
                this.onSuccessRemoveWashingData();
            }
            else {
                this.washingDataService.onApiError(res.statusText);
            }
        }, this.washingDataService.onApiError);
    }

    private onSuccessRemoveWashingData() {
        const elementIndex = this.washingDataService.data.indexOf(this.washingData);
        this.washingDataService.data.splice(elementIndex, 1);

        this.navCtrl.setRoot(HomePage);
    }

    private updateWashingData(formWashingValues) {
        this.washingDataService.updateWashingData(formWashingValues).subscribe((res: IServerResponse<IWashingData>) => {
            if (res.status === 'success') {
                this.onSuccessUpdateWashingData(res.data);
            }
            else if (res.status === 'error') {
                this.washingDataService.onApiError(res.statusText);
            }
        }, this.washingDataService.onApiError);
    }


    private onSuccessUpdateWashingData(washingData: IWashingData) {
        const elementIndex = this.washingDataService.data.indexOf(this.washingData);
        this.washingDataService.data.splice(elementIndex, 1, washingData);

        //Navigate to page with washing details
        this.navCtrl.setRoot(this.viewWashingDataPage, {
            washingData: washingData
        });
    }
}
