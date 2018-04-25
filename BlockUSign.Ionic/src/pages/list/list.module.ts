import { IonicPageModule } from "ionic-angular";
import { ListPage } from "./list";
import { NgModule } from "@angular/core";
import { AbsoluteDragDirective } from '../../directives/absolute-drag/absolute-drag';


@NgModule({
    declarations: [
        ListPage,
        AbsoluteDragDirective
    ],
    imports: [
      IonicPageModule.forChild(ListPage)
    ],
    entryComponents: [
        ListPage
    ]
  })
  export class ListModule {}