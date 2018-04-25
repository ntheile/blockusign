import { IonicPageModule } from "ionic-angular";
import { ListPage } from "./list";
import { NgModule } from "@angular/core";

@NgModule({
    declarations: [
        ListPage
    ],
    imports: [
      IonicPageModule.forChild(ListPage)
    ],
    entryComponents: [
        ListPage
    ]
  })
  export class ListModule {}