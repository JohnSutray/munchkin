import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolPipe } from 'apps/munchkin/src/app/pipes/bool.pipe';
import { NegatePipe } from './negate.pipe';


@NgModule({
  declarations: [
    BoolPipe,
    NegatePipe,
  ],
  exports: [
    BoolPipe,
    NegatePipe,
  ],
  imports: [
    CommonModule,
  ],
})
export class PipesModule {
}
