import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveReadyStateComponent } from './approve-ready-state.component';



@NgModule({
  declarations: [
    ApproveReadyStateComponent,
  ],
  exports: [
    ApproveReadyStateComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ApproveReadyStateModule { }
