import { NgModule, ModuleWithProviders } from '@angular/core';
import { BlockStepsComponent } from './block-steps/block-steps';
import { IonicModule } from 'ionic-angular';
import { BlockPdfComponent } from './block-pdf/block-pdf';
import { DirectivesModule } from '../directives/directives.module';
import { BlockChatComponent } from './block-chat/block-chat';

@NgModule({
    declarations: [BlockStepsComponent,
        BlockPdfComponent,
    BlockChatComponent],
    imports: [
        IonicModule,
        DirectivesModule
    ],
    exports: [BlockStepsComponent,
        BlockPdfComponent,
    BlockChatComponent]
})
export class BlockStepsComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BlockStepsComponentModule,
            providers: []
        };
    }
}
