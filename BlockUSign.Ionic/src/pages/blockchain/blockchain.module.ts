import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlockchainPage } from './blockchain';
import { BlockStepsComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BlockchainPage,
  ],
  imports: [
    IonicPageModule.forChild(BlockchainPage),
    BlockStepsComponentModule
  ],
})
export class BlockchainPageModule {}
