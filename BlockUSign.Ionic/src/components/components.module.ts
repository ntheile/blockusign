import { NgModule, ModuleWithProviders } from '@angular/core';
import { BlockStepsComponent } from './block-steps/block-steps';
import { IonicModule } from 'ionic-angular';
import { BlockPdfComponent } from './block-pdf/block-pdf';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
    declarations: [BlockStepsComponent,
        BlockPdfComponent],
    imports: [
        IonicModule,
        DirectivesModule
    ],
    exports: [BlockStepsComponent,
        BlockPdfComponent]
})
export class BlockStepsComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BlockStepsComponentModule,
            providers: []
        };
    }
}
