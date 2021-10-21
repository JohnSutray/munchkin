import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpponentWorkspaceComponent } from './opponent-workspace.component';



@NgModule({
  declarations: [
    OpponentWorkspaceComponent,
  ],
  exports: [
    OpponentWorkspaceComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class OpponentWorkspaceModule { }
