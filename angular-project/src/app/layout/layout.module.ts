import {NgModule} from "@angular/core";
import {ContentLayoutComponent} from "./content-layout/content-layout.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    ContentLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule {

}
