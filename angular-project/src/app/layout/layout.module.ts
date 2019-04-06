import {NgModule} from "@angular/core";
import {ContentLayoutComponent} from "./content-layout/content-layout.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./header/header.component";
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule.forChild([])
  ]
})
export class LayoutModule {

}
