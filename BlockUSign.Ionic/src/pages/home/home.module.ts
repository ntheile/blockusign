import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { NgModule } from "@angular/core";


@NgModule({
    declarations: [
      HomePage
    ],
    imports: [
      IonicPageModule.forChild(HomePage)
    ],
    entryComponents: [
        HomePage
    ]
  })
  export class HomeModule {}