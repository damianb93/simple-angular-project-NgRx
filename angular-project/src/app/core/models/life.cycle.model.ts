import {OnDestroy} from "@angular/core";

export class LifeCycle implements OnDestroy {

  alive = true;

  ngOnDestroy(): void {
    this.alive = false;
  }
}
