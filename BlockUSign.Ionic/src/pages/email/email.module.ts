import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailPage } from './email';
import { BlockStepsComponentModule } from '../../components/components.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmailPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailPage),
    BlockStepsComponentModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [
    
  ]
})
export class EmailPageModule { }
