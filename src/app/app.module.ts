import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutProgrammPage } from '../pages/about-programm/about-programm';
import { AddWashingDataPage } from '../pages/add-washing-data/add-washing-data';
import { EditWashingDataPage } from '../pages/edit-washing-data/edit-washing-data';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsBoxesPage } from '../pages/settings-boxes/settings-boxes';
import { SettingsCarsPage } from '../pages/settings-cars/settings-cars';
import { TabsPage } from '../pages/tabs/tabs';
import { ViewWashingDataPage } from '../pages/view-washing-data/view-washing-data';
import { SettingsCarsService } from '../providers/settings-cars.service';
import { WashingDataService } from '../providers/washing-data.service';
import { WashingDataFormComponent } from '../components/washing-data-form/washing-data-form.component';
import { SettingsCarsFormComponent } from '../components/settings-cars-form/settings-cars-form.component';
import { ObjectToIterablePipe } from '../pipes/object-to-iterable.pipe';
import { FocusDirective } from '../directives/focus.directive';

@NgModule({
  declarations: [
    MyApp,
    AboutProgrammPage,
    AddWashingDataPage,
    EditWashingDataPage,
    HomePage,
    SettingsPage,
    SettingsBoxesPage,
    SettingsCarsPage,
    TabsPage,
    ViewWashingDataPage,
    WashingDataFormComponent,
    SettingsCarsFormComponent,
    ObjectToIterablePipe,
    FocusDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutProgrammPage,
    AddWashingDataPage,
    EditWashingDataPage,
    HomePage,
    SettingsPage,
    SettingsBoxesPage,
    SettingsCarsPage,
    TabsPage,
    ViewWashingDataPage
  ],
  providers: [
    SettingsCarsService,
    WashingDataService
  ]
})
export class AppModule {}
