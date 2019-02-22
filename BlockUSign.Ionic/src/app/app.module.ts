import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule, List, NavController } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ChartsModule } from 'ng2-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { OptionsPopoverPage } from './options.popover.page';
import { DirectivesModule } from './../directives/directives.module';
import { HomeModule } from '../pages/home/home.module';
import { AnnotatePageModule } from '../pages/annotate/annotate.module';
import { SignPageModule } from '../pages/sign/sign.module';
import { EmailPageModule } from '../pages/email/email.module';
import { ReviewPageModule } from '../pages/review/review.module';
import { BlockStepsComponentModule } from './../components/components.module';
import { BlockchainPageModule } from './../pages/blockchain/blockchain.module';
import { FeaturesModalPageModule } from './../pages/features-modal/features-modal.module';
import { VideoModalPageModule } from './../pages/video-modal/video-modal.module';


//import { HomePage } from './../pages/home/home';
//import { AnnotatePage } from './../pages/annotate/annotate';

import { CoinService } from '../services/coin.service';
import { GlobalService } from '../services/global.service'
import { CryptoCompareService } from '../services/cryptocompare.service';
import { SlackService } from '../services/slack.service';
import { DocumentService } from '../services/document.service';
import { EmailService } from '../services/email.service';
import { BlockStackService } from '../services/blockstack.service';
import { Block } from 'bitcoinjs-lib';
import { BitcoinService } from '../services/bitcoin.service';
import { HttpClientModule } from '@angular/common/http';
import { FeatureProvider } from '../providers/feature/feature';

@NgModule({
  declarations: [
    MyApp,
    OptionsPopoverPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
    DirectivesModule,
    ChartsModule,
    HttpModule,
    JsonpModule,
    HomeModule,
    AnnotatePageModule,
    SignPageModule,
    EmailPageModule,
    ReviewPageModule,
    BlockchainPageModule,
    NgSelectModule, 
    FormsModule,
    BlockStepsComponentModule,
    FeaturesModalPageModule,
    VideoModalPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OptionsPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BlockStackService,
    CoinService,
    CryptoCompareService,
    SlackService,
    GlobalService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DocumentService,
    EmailService,
    BitcoinService,
    FeatureProvider,
  ]
})
export class AppModule {}
