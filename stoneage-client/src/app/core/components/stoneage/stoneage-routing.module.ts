import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StoneageComponent } from "./stoneage.component";

const routes: Routes = [
   { path: "", component: StoneageComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class StoneageRoutingModule {}
