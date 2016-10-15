import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsCarsService } from '../../providers/settings-cars.service';
import { ICar } from '../../interfaces/car.interface';

@Component({
    templateUrl: 'settings-cars.html'
})
export class SettingsCarsPage {
    private carsForm: FormGroup;
    private submitAttempt: boolean = false;
    private isEditing: number = -1;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private settingsCarsService: SettingsCarsService, private alertCtrl: AlertController) {
        this.initForm();
    }

    private initForm() {
        this.carsForm = this.formBuilder.group({
            //Car brand
            brand: ['', Validators.required]
        });
    }

    private onSubmit() {
        this.submitAttempt = true;

        if (this.carsForm.valid) {
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

    private editCar(car: ICar) {
        this.isEditing = car.id;
    }
}
