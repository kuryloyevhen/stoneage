import { Component, OnInit, ElementRef } from "@angular/core";
import { CardsService } from "src/app/core/services/cards.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { Card } from "src/app/shared/interfaces/card";

@Component({
	selector: "app-civilization-cards",
	templateUrl: "./civilization-cards.component.html",
	styleUrls: ["./civilization-cards.component.css"]
})
export class CivilizationCardsComponent implements OnInit {
	constructor(
		private service: CardsService,
		private storage: StorageService,
		private elemRef: ElementRef
	) {}

	private elem: HTMLElement = this.elemRef.nativeElement;
	public cards: Array<HTMLElement>;

	ngOnInit() {
		this.cards = Array.from(
			this.elem.getElementsByClassName("civilization-card")
		) as Array<HTMLElement>;
		this.cards.forEach((elem: HTMLElement, index: number) => {
			elem.dataset.id = String(index);
			const cost: HTMLElement = elem.getElementsByClassName(
				"cost"
			)[0] as HTMLElement;
			cost.textContent = `${index + 1} resources`;
		});
	}
}
