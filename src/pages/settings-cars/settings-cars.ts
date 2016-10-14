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
            this.settingsCarsService.addCar(this.carsForm.value);
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
                        this.settingsCarsService.removeCar(car);
                }
            }]
        });

        confirmRemoveAlert.present();
    }
}
