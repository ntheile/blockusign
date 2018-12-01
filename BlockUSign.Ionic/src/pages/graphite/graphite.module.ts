import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphitePage } from './graphite';

@NgModule({
  declarations: [
    GraphitePage,
  ],
  imports: [
    IonicPageModule.forChild(GraphitePage),
  ],
})
export class GraphitePageModule {}
