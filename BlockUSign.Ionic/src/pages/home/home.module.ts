import { IonicPageModule, IonicModule } from "ionic-angular";
import { HomePage } from "./home";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BlockStepsComponentModule } from '../../components/components.module';
//import { BlockStepsComponent } from '../../components/block-steps/block-steps';

@NgModule({
    declarations: [
      HomePage,
      //BlockStepsComponent
    ],
    imports: [
      IonicPageModule.forChild(HomePage),
      BlockStepsComponentModule
    ],
    entryComponents: [
        HomePage
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class HomeModule {}