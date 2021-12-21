import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariableDirective } from './variable.directive';


@NgModule({
  declarations: [
    VariableDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    VariableDirective,
  ],
})
export class VariableDirectiveModule {
}
