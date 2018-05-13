import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignPage } from './sign';
import { BlockStepsComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SignPage,
  ],
  imports: [
    IonicPageModule.forChild(SignPage),
    BlockStepsComponentModule
  ],
})
export class SignPageModule {}
