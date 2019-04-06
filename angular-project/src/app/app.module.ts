import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {LayoutModule} from "./layout/layout.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,

    BrowserModule,

    CoreModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
