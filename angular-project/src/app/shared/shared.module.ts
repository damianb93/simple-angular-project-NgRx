import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    NgbModule
  ]
})
export class SharedModule {

}
