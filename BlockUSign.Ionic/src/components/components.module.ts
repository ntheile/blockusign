import { NgModule, ModuleWithProviders } from '@angular/core';
import { BlockStepsComponent } from './block-steps/block-steps';
import { IonicModule } from 'ionic-angular';
import { BlockPdfComponent } from './block-pdf/block-pdf';
import { DirectivesModule } from '../directives/directives.module';
import { BlockChatComponent } from './block-chat/block-chat';
import { LoadingComponent } from './loading/loading';


@NgModule({
    declarations: [BlockStepsComponent,
        BlockPdfComponent,
    BlockChatComponent,
    LoadingComponent],
    imports: [
        IonicModule,
        DirectivesModule
    ],
    exports: [BlockStepsComponent,
        BlockPdfComponent,
    BlockChatComponent,
    LoadingComponent]
})
export class BlockStepsComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BlockStepsComponentModule,
            providers: [
            ]
        };
    }
}
