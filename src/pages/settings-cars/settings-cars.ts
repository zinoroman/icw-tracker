import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsCarsService } from '../../providers/settings-cars.service';
import { ICar } from '../../interfaces/car.interface';

@Component({
    templateUrl: 'settings-cars.html'
})
export class SettingsCarsPage {
    private isEditing: number = -1;

    constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private settingsCarsService: SettingsCarsService, private alertCtrl: AlertController) {
        
    }

    private editCar(car: ICar) {
        this.isEditing = car.id;
    }

    private carUpdated(car: ICar) {
        this.isEditing = -1;
    }
}
