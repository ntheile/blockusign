import { IonicPageModule } from "ionic-angular";
import { AnnotatePage } from "./annotate";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
//import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';
import { BlockStepsComponentModule } from '../../components/components.module';

@NgModule({
    declarations: [
        AnnotatePage,
        
        //AbsoluteDragDirective
    ],
    imports: [
      IonicPageModule.forChild(AnnotatePage),
      BlockStepsComponentModule
    ],
    entryComponents: [
        AnnotatePage
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class AnnotatePageModule {}