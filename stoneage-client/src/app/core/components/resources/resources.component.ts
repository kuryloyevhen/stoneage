import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";
import { StorageService } from "src/app/shared/services/storage.service";
import { ReturningPeople } from "src/app/shared/interfaces/returningPeople";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-resources",
	templateUrl: "./resources.component.html",
	styleUrls: ["./resources.component.css"]
})
export class ResourcesComponent implements OnInit, OnDestroy {
	constructor(private socket: SocketService, private storage: StorageService) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public resourceTitles: Array<HTMLElement>;
	public resourceKinds: Array<string> = ["Wood", "Clay", "Stone", "Gold"];
	public resources: Array<HTMLElement>;
	public wood: Array<HTMLElement>;
	public clay: Array<HTMLElement>;
	public stone: Array<HTMLElement>;
	public gold: Array<HTMLElement>;

	ngOnInit() {
		this.resources = Array.from(
			document.getElementsByClassName("resource")
		) as Array<HTMLElement>;
		for (let i = 0; i < this.resources.length; i++) {
			this.resources[i].dataset.name = this.resourceKinds[i].toLowerCase();
			this.resources[i].dataset.id = String(i);
		}

		this.resourceTitles = Array.from(
			document.getElementsByClassName("resource-kind")
		) as Array<HTMLElement>;
		for (let i = 0; i < this.resourceTitles.length; i++) {
			this.resourceTitles[i].textContent = this.resourceKinds[i];
		}

		for (const resource of this.resources) {
			switch (resource.dataset.name) {
				case "wood":
					this.wood = Array.from(
						resource.getElementsByClassName("human-place")
					) as Array<HTMLElement>;
					break;
				case "clay":
					this.clay = Array.from(
						resource.getElementsByClassName("human-place")
					) as Array<HTMLElement>;
					break;
				case "stone":
					this.stone = Array.from(
						resource.getElementsByClassName("human-place")
					) as Array<HTMLElement>;
					break;
				case "gold":
					this.gold = Array.from(
						resource.getElementsByClassName("human-place")
					) as Array<HTMLElement>;
					break;
			}
		}

		this.socket
			.getMovement()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(res => {
				switch (res.resource) {
					case "wood":
						this.getCheckedResources(this.wood, res);
						break;
					case "clay":
						this.getCheckedResources(this.clay, res);
						break;
					case "stone":
						this.getCheckedResources(this.stone, res);
						break;
					case "gold":
						this.getCheckedResources(this.gold, res);
						break;
				}
			});

		this.socket
			.getReturn()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(data => {
				switch (data.resourceName) {
					case "wood":
						this.returnResources(this.wood, data);
						break;
					case "clay":
						this.returnResources(this.clay, data);
						break;
					case "stone":
						this.returnResources(this.stone, data);
						break;
					case "gold":
						this.returnResources(this.gold, data);
						break;
				}
			});
	}

	getCheckedResources(humanPlaces: Array<any>, data) {
		let amount = Number(data.amount);
		let elem = humanPlaces[0];
		while (amount !== 0) {
			if (!elem.classList.contains("checked")) {
				elem.dataset.owner = data.id;
				elem.classList.add("checked");
				amount--;
			}
			elem = elem.nextSibling;
		}
	}

	returnResources(humanPlaces, data) {
		for (const item of humanPlaces) {
			if (item.dataset.owner === data.id) {
				item.classList.remove("checked");
				item.dataset.owner = "";
			}
		}
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
