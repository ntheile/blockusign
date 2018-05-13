import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailPage } from './email';
import { BlockStepsComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    EmailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailPage),
    BlockStepsComponentModule
  ],
})
export class EmailPageModule { }
