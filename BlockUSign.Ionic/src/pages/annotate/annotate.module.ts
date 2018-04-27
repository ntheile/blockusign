import { IonicPageModule } from "ionic-angular";
import { AnnotatePage } from "./annotate";
import { NgModule } from "@angular/core";
//import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';
import { DirectivesModule } from '../../directives/directives.module';



@NgModule({
    declarations: [
        AnnotatePage
        //AbsoluteDragDirective
        
    ],
    imports: [
      IonicPageModule.forChild(AnnotatePage),
      DirectivesModule
    ],
    entryComponents: [
        AnnotatePage
    ]
  })
  export class AnnotatePageModule {}