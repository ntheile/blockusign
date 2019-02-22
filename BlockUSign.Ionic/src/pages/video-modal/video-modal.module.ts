import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoModalPage } from './video-modal';
import { BlockStepsComponentModule } from './../../components/components.module';

@NgModule({
  declarations: [
    VideoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoModalPage),
    BlockStepsComponentModule
  ],
})
export class VideoModalPageModule {}
