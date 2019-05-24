import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { StorageService } from "../../services/storage.service";
import { SocketService } from "../../services/socket.service";
import { Card } from "src/app/shared/interfaces/card";

@Component({
	selector: "app-card-dialog",
	templateUrl: "./card-dialog.component.html",
	styleUrls: ["./card-dialog.component.css"]
})
export class CardDialogComponent implements OnInit {
	constructor(
		public dialog: MatDialog,
		private storage: StorageService,
		private socket: SocketService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	public selectedResourceToPay: string = "";
	public selectedResourceToTake: string = "";
	public resultOfRollTheDice: number;
	public resultsOfRollTheDice: number[] = [];
	public randomOtions: Array<string> = [
		"wood",
		"clay",
		"stone",
		"gold",
		"tool",
		"agronomy"
	];
	public countedResourceAmount: number;
	public available: boolean = true;
	public card: Card = this.data.card as Card;
	public amount: number = this.data.amount as number;

	ngOnInit() {}

	checkAvailableResources() {
		if (
			this.storage.playerStatistics[this.selectedResourceToPay] >= this.amount
		) {
			this.available = true;
		} else {
			this.available = false;
		}
	}

	countResource(type: string) {
		if (type === "selected") {
			this.countSelectedResource();
		} else if (type === "dice") {
			this.countResourceByRollTheDice();
		} else {
			this.countFixedResource();
		}
	}

	rollTheDice(typeOfCard: string) {
		const min = 1;
		const max = 6;
		if (typeOfCard === "dice") {
			let random = 0;
			for (let i = 1; i <= 2; i++) {
				random += Math.round(Math.random() * (max - min) + min);
			}
			this.resultOfRollTheDice = random;
		} else {
			for (let i = 1; i <= 4; i++) {
				this.resultsOfRollTheDice.push(
					Math.round(Math.random() * (max - min) + min)
				);
			}
			this.resultsOfRollTheDice.sort((a, b) => {
				return a - b;
			});
		}
	}

	countSelectedResource() {
		const data = {
			card: this.amount - 1,
			type: this.card.instantType,
			resource: this.selectedResourceToTake,
			amount: this.card.instantAmount
		};
		this.socket.returnPeople(data);
	}

	countResourceByRollTheDice() {
		this.rollTheDice("dice");
		switch (this.card.instantSubtype) {
			case "wood":
				this.countedResourceAmount = this.countedResourceAmount / 3;
				break;
			case "clay":
				this.countedResourceAmount = this.countedResourceAmount / 4;
				break;
			case "stone":
				this.countedResourceAmount = this.countedResourceAmount / 5;
				break;
			case "gold":
				this.countedResourceAmount = this.countedResourceAmount / 6;
				break;
		}
		const data = {
			card: this.amount - 1,
			type: this.card.instantType,
			resource: this.card.instantSubtype,
			amount: this.countedResourceAmount
		};
		this.socket.returnPeople(data);
		this.countedResourceAmount = 0;
		this.resultOfRollTheDice = 0;
	}

	countFixedResource() {
		const data = {
			card: this.amount - 1,
			type: this.card.instantType,
			resource: this.card.instantSubtype,
			amount: this.card.instantAmount
		};
		this.socket.returnPeople(data);
	}

	takeRandomResource(resource: string) {
		const data = {
			card: this.amount - 1,
			type: "random",
			resource,
			amount: 1
		};
		this.socket.returnPeople(data);
	}

	takeTool() {
		const data = {
			card: this.amount - 1,
			type: "tools",
			resource: this.card.instantSubtype,
			amount: this.card.instantAmount
		};
		this.socket.returnPeople(data);
	}

	takeAgronomy() {
		const data = {
			card: this.amount - 1,
			type: "agronomy",
			resource: this.card.instantSubtype,
			amount: this.card.instantAmount
		};
		this.socket.returnPeople(data);
	}

	takePoints() {
		const data = {
			card: this.amount - 1,
			type: "points",
			amount: this.card.instantAmount
		};
		this.socket.returnPeople(data);
	}

	takeCard() {}
}
