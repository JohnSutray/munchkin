import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBarComponent } from './status-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VariableDirectiveModule } from '../directives/variable-directive/variable-directive.module';



@NgModule({
  declarations: [
    StatusBarComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    VariableDirectiveModule,
  ],
  exports: [
    StatusBarComponent,
  ],
})
export class StatusBarModule { }
