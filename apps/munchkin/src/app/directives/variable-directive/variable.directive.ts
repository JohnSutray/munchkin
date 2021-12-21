import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[variable]',
})
export class VariableDirective {
  @Input() variable: any;

  constructor(
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef,
  ) {
    viewContainer.createEmbeddedView(templateRef);
  }
}
