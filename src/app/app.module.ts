import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { IonicStorageModule } from '@ionic/storage';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ConfigProvider } from '../providers/config';
import { DataProvider } from '../providers/data';

import { ArrondissementModal } from '../modals/arrondissement/arrondissement';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ArrondissementModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ArrondissementModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ConfigProvider,
    DataProvider,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
