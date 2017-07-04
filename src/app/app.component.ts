import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data';
import { ConfigProvider } from '../providers/config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, data:DataProvider, config:ConfigProvider) {
    platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        data.load().then(result => {
            config.load().then(result2 => {
                this.rootPage = HomePage;
            });
        });
    });
  }
}

