import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { ResourceComponent } from "src/app/shared/components/resource/resource.component";
import { ResourcesComponent } from "src/app/core/components/resources/resources.component";
import { WorkToolComponent } from "src/app/shared/components/work-tool/work-tool.component";
import { WorkToolsComponent } from "src/app/core/components/work-tools/work-tools.component";
import { DwellingComponent } from "src/app/shared/components/dwelling/dwelling.component";
import { DwellingsComponent } from "src/app/core/components/dwellings/dwellings.component";
import { CardsComponent } from "src/app/core/components/cards/cards.component";
import { CivilizationCardsComponent } from "src/app/core/components/civilization-cards/civilization-cards.component";
import { CivilizationCardComponent } from "src/app/shared/components/civilization-card/civilization-card.component";
import { AgronomyComponent } from "src/app/core/components/agronomy/agronomy.component";
import { SmithyComponent } from "src/app/core/components/smithy/smithy.component";
import { ReproductionComponent } from "src/app/core/components/reproduction/reproduction.component";
import { HumanWorkComponent } from "src/app/core/components/human-work/human-work.component";
import { StuffComponent } from "src/app/core/components/stuff/stuff.component";
import { UserStatisticComponent } from "src/app/core/components/user-statistic/user-statistic.component";
import { ChatComponent } from "src/app/core/components/chat/chat.component";
import { StoneageComponent } from "src/app/core/components/stoneage/stoneage.component";
import { BlockingLayerComponent } from "src/app/core/components/blocking-layer/blocking-layer.component";
import { StoneageRoutingModule } from "src/app/core/components/stoneage/stoneage-routing.module";
import { CardsService } from "src/app/core/services/cards.service";
import { CardDialogComponent } from "src/app/shared/components/card-dialog/card-dialog.component";
import { MatSelectModule } from "@angular/material/select";
import { DwellingDialogComponent } from "src/app/shared/components/dwelling-dialog/dwelling-dialog.component";

@NgModule({
	declarations: [
		ResourceComponent,
		ResourcesComponent,
		WorkToolComponent,
		WorkToolsComponent,
		DwellingComponent,
		DwellingsComponent,
		CardsComponent,
		CivilizationCardsComponent,
		CivilizationCardComponent,
		AgronomyComponent,
		SmithyComponent,
		ReproductionComponent,
		HumanWorkComponent,
		StuffComponent,
		UserStatisticComponent,
		ChatComponent,
		StoneageComponent,
		BlockingLayerComponent,
		CardDialogComponent,
		DwellingDialogComponent
	],
	imports: [
		FormsModule,
		CommonModule,
		StoneageRoutingModule,
		MatDialogModule,
		MatSelectModule
	],
	providers: [CardsService],
	entryComponents: [CardDialogComponent, DwellingDialogComponent]
})
export class StoneageModule {}
