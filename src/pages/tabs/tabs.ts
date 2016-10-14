import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AddWashingDataPage } from '../add-washing-data/add-washing-data';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = AddWashingDataPage;
    this.tab3Root = SettingsPage;
  }
}
