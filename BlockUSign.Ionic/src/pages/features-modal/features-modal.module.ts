import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeaturesModalPage } from './features-modal';

@NgModule({
  declarations: [
    FeaturesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FeaturesModalPage),
  ],
})
export class FeaturesModalPageModule {}
