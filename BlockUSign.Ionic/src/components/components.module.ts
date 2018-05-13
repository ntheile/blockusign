import { NgModule, ModuleWithProviders } from '@angular/core';
import { BlockStepsComponent } from './block-steps/block-steps';
import { IonicModule } from 'ionic-angular';


@NgModule({
	declarations: [BlockStepsComponent],
	imports: [IonicModule],
	exports: [BlockStepsComponent]
})
export class BlockStepsComponentModule {
	static forRoot(): ModuleWithProviders {
        return {
            ngModule: BlockStepsComponentModule,
            providers: []
        };
    }
}
