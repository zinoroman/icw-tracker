import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NavController, AlertController, Alert } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/customValidators';
import { WashingDataService } from '../../providers/washing-data.service';
import { SettingsCarsService } from '../../providers/settings-cars.service';
import { IWashingData, IWashingDataPrice } from '../../interfaces/washing-data.interface';
import { IServerResponse } from '../../interfaces/server-response.interface';
import { ICar } from '../../interfaces/car.interface';
import { ViewWashingDataPage } from '../../pages/view-washing-data/view-washing-data';
import { HomePage } from '../../pages/home/home';

@Component({
    selector: 'settings-cars-form',
    templateUrl: 'settings-cars-form.component.html'
})
export class SettingsCarsFormComponent implements OnChanges{
    private carsForm: FormGroup;
    private submitAttempt: boolean = false;
    @Input() car;
    @Output() carUpdated = new EventEmitter();

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private settingsCarsService: SettingsCarsService, private alertCtrl: AlertController) {
        this.initForm();
    }

    private initForm() {
        this.carsForm = this.formBuilder.group({
            //Car brand
            brand: ['', Validators.required]
        });
    }

    public ngOnChanges() {
        this.carsForm.setValue({
            brand: this.car.brand    
        }, {
            onlySelf: true
        })
    }

    private onSubmit() {
        this.submitAttempt = true;

        if (this.carsForm.valid) {
            const formValues = this.carsForm.value;

            if (this.car && this.car.id) {
                formValues.id = this.car.id;
                this.updateCar(formValues);
            }
            else {
                this.addCar(formValues);
            }
        }
    }

    private addCar(car: ICar) {
        this.settingsCarsService.addCar(this.carsForm.value)
            .subscribe((res) => {
                if (res.status === 'success') {
                    this.settingsCarsService.data.unshift(res.data);
                }
                else if (res.status === 'error') {
                    this.settingsCarsService.onApiError(res.statusText);
                }
            }, this.settingsCarsService.onApiError);
    }

    private updateCar(car: ICar) {
        this.settingsCarsService.updateCar(this.carsForm.value)
            .subscribe((res) => {
                if (res.status === 'success') {
                    const index = this.settingsCarsService.data.indexOf(this.car);
                    this.settingsCarsService.data.splice(index, 1, res.data);
                }
                else if (res.status === 'error') {
                    this.settingsCarsService.onApiError(res.statusText);
                }

                this.carUpdated.emit(res.data);

            }, this.settingsCarsService.onApiError);

    }

    private removeCar(car: ICar) {
        const confirmRemoveAlert = this.alertCtrl.create({
            title: 'Видалити запис?',
            buttons: [{
                    text: 'Скасувати'
                }, {
                    text: 'Так',
                    handler: () => {
                        this.settingsCarsService.removeCar(car)
                            .subscribe((res) => {
                                if (res.status === 'success') {
                                    this.settingsCarsService.data.splice(this.settingsCarsService.data.indexOf(car), 1);
                                }
                                else if (res.status === 'error') {
                                    this.settingsCarsService.onApiError(res.statusText);
                                }
                            }, this.settingsCarsService.onApiError);
                    }
                }
            ]
        });

        confirmRemoveAlert.present();
    }

}
