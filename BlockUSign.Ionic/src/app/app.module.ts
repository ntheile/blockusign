import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';

import { CoinService } from '../services/coin.service';
import { GlobalService } from '../services/global.service'

import { CryptoCompareService } from '../services/cryptocompare.service';
import { SlackService } from '../services/slack.service';

import { AbsoluteDragDirective } from '../directives/absolute-drag/absolute-drag';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AbsoluteDragDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    HttpModule,
    JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CoinService,
    CryptoCompareService,
    SlackService,
    GlobalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
