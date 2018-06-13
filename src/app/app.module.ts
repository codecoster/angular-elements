import { HttpClientModule } from '@angular/common/http';
import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';

import { DemoElementComponent } from './demo-element/demo-element.component';


@NgModule({
  declarations: [
    DemoElementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  entryComponents: [DemoElementComponent],
  providers: [{provide: LOCALE_ID, useValue: 'de'}]
})
export class AppModule {

  constructor(injector: Injector) {
    const customElement = createCustomElement(DemoElementComponent, {injector});
    customElements.define('ks-demo-element', customElement);
  }

  ngDoBootstrap() {
  }
}
