import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";
import {CONTENT_ROUTES} from "./core/routes/content-layout.routes";

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: CONTENT_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
