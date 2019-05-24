import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";
import { StorageService } from "../../services/storage.service";
import { SocketService } from "../../services/socket.service";
import { DwellingData } from "src/app/shared/interfaces/dwellingData";
import { Dwelling } from "src/app/shared/interfaces/dwelling";

@Component({
	selector: "app-dwelling-dialog",
	templateUrl: "./dwelling-dialog.component.html",
	styleUrls: ["./dwelling-dialog.component.css"]
})
export class DwellingDialogComponent implements OnInit {
	constructor(
		public dialog: MatDialog,
		private storage: StorageService,
		private socket: SocketService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {}

	public dwelling: Dwelling = this.data.card;
	public index: number = this.data.index;
	public selectedResource: string;
	public selectedResourceAmount: number;
	public isAvailable: object = {
		wood: true,
		clay: true,
		stone: true,
		gold: true
	};
	public permit: boolean = true;
	public isRequirementsFulfilled: boolean = true;
	public woodAmount: number;
	public clayAmount: number;
	public stoneAmount: number;
	public goldAmount: number;
	public resourceAmount: number;

	ngOnInit() {
		console.log(this.dwelling);
	}

	checkAvailability(resource: string, amount: number) {
		if (this.storage.playerStatistics[resource] >= amount) {
			this.isAvailable[resource] = true;
		} else {
			this.isAvailable[resource] = false;
		}
	}

	reset(object: object) {
		for (const item in object) {
			if (object.hasOwnProperty(item) && object.propertyIsEnumerable(item)) {
				object[item] = true;
			}
		}
	}

	availabilityControl = () =>
		Object.values(this.isAvailable).every(value => value === true);

	countStandartCard() {
		let data: DwellingData = {};
		if (this.dwelling.wood) {
			data.wood = this.dwelling.wood;
		}
		if (this.dwelling.clay) {
			data.clay = this.dwelling.clay;
		}
		if (this.dwelling.stone) {
			data.stone = this.dwelling.stone;
		}
		if (this.dwelling.gold) {
			data.gold = this.dwelling.gold;
		}
		for (let resource in data) {
			if (
				data.hasOwnProperty(resource) &&
				data.propertyIsEnumerable(resource)
			) {
				this.checkAvailability(resource, this.dwelling[resource]);
			}
		}
		if (this.availabilityControl()) {
			data.points = this.dwelling.pointsAmount;
			data.dwelling = this.dwelling.id;
			data.index = this.index;
			this.permit = true;
			this.reset(this.isAvailable);
			this.permit = true;
			this.socket.returnPeople(data);
		} else {
			this.reset(this.isAvailable);
			this.permit = false;
		}
	}

	countFixedCard() {
		let data: DwellingData = {};
		let numberOfResources = 0;
		if (this.woodAmount) {
			data.wood = this.woodAmount;
		}
		if (this.clayAmount) {
			data.clay = this.clayAmount;
		}
		if (this.stoneAmount) {
			data.stone = this.stoneAmount;
		}
		if (this.woodAmount) {
			data.gold = this.goldAmount;
		}
		for (let resource in data) {
			if (
				data.hasOwnProperty(resource) &&
				data.propertyIsEnumerable(resource)
			) {
				numberOfResources++;
			}
		}
		if ((numberOfResources = this.dwelling.differenceRequirement)) {
			if (this.availabilityControl()) {
				this.permit = true;
				this.reset(this.isAvailable);
				data.points = this.countExistingResources(data);
				console.log("Fixed card");
				console.log(data);
				//this.socket.returnPeople(data);
			} else {
				this.reset(this.isAvailable);
				this.permit = false;
			}
		} else {
			this.isRequirementsFulfilled = false;
		}
	}

	countRandomResource() {
		let data: DwellingData = {};
		switch (this.selectedResource) {
			case "wood":
				data.wood = this.selectedResourceAmount;
				data.points = this.selectedResourceAmount * 3;
				this.checkAvailability("wood", this.selectedResourceAmount);
				break;
			case "clay":
				data.clay = this.selectedResourceAmount;
				data.points = this.selectedResourceAmount * 4;
				this.checkAvailability("clay", this.selectedResourceAmount);
				break;
			case "stone":
				data.stone = this.selectedResourceAmount;
				data.points = this.selectedResourceAmount * 5;
				this.checkAvailability("stone", this.selectedResourceAmount);
				break;
			case "gold":
				data.gold = this.selectedResourceAmount;
				data.points = this.selectedResourceAmount * 6;
				this.checkAvailability("gold", this.selectedResourceAmount);
				break;
		}
		if (this.availabilityControl()) {
			this.reset(this.availabilityControl);
			this.permit = true;
			console.log("Standart card");
			console.log(data);
			//this.socket.returnPeople(data);
		} else {
			this.reset(this.isAvailable);
			this.permit = false;
		}
	}

	countExistingResources(data) {
		let points = 0;
		for (let resource in data) {
			if (
				data.hasOwnProperty(resource) &&
				data.propertyIsEnumerable(resource)
			) {
				switch (resource) {
					case "wood":
						points += data.wood * 3;
						break;
					case "clay":
						points += data.clay * 4;
						break;
					case "stone":
						points += data.stone * 5;
						break;
					case "gold":
						points += data.gold * 6;
						break;
				}
			}
		}
		return points;
	}
}
