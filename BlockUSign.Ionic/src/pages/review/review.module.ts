import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewPage } from './review';
import { BlockStepsComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewPage),
    BlockStepsComponentModule
  ],
})
export class ReviewPageModule {}
