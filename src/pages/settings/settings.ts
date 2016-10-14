import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { SettingsCarsPage } from '../settings-cars/settings-cars';
import { SettingsBoxesPage } from '../settings-boxes/settings-boxes';
import { AboutProgrammPage } from '../about-programm/about-programm';

@Component({
    templateUrl: 'settings.html'
})
export class SettingsPage {
    private settingsCarsPage = SettingsCarsPage;
    private settingsBoxesPage = SettingsBoxesPage;
    private aboutProgrammPage = AboutProgrammPage;

    constructor(private navCtrl: NavController) {

    }
}
