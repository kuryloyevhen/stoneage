import { Component, OnInit, OnDestroy } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import { SocketService } from "src/app/shared/services/socket.service";
import { ButtonAccessControl } from "src/app/shared/interfaces/buttonsControl";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-user-statistic",
	templateUrl: "./user-statistic.component.html",
	styleUrls: ["./user-statistic.component.css"]
})
export class UserStatisticComponent implements OnInit, OnDestroy {
	constructor(private storage: StorageService, private socket: SocketService) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public currentPhase: string;
	public player: PlayerStatistic = {
		wood: 0,
		clay: 0,
		stone: 0,
		gold: 0,
		agronomy: 0,
		smithy: 0,
		dwellings: {},
		civilizationCards: {},
		points: 0,
		population: 0,
		food: 0,
		id: ""
	};
	public playerId: string;
	public resultOfDiceRoll: number;
	public receivedResources: number;
	public maxWorkTools: number;
	public minWorkTools: number = 0;
	public currentAddition: number = 0;
	public mockSmithy: number;
	public mockResult: number;

	public isDisabled: ButtonAccessControl = {
		wood: true,
		clay: true,
		stone: true,
		gold: true,
		population: true,
		food: true,
		agronomy: true,
		smithy: true
	};

	public isEnd: () => boolean = () =>
		Object.values(this.isDisabled).every(value => value === true);

	ngOnInit() {
		this.currentPhase = this.socket.currentPhase as string;
		for (const prop in this.player) {
			if (
				this.player.hasOwnProperty(prop) &&
				this.player.propertyIsEnumerable(prop)
			) {
				this.player[prop] = this.storage.playerStatistics[prop];
			}
		}

		this.mockSmithy = this.player.smithy;
		this.maxWorkTools = this.mockSmithy;

		this.socket
			.changes()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: PlayerStatistic) => {
				for (const prop in res) {
					if (res.hasOwnProperty(prop) && res.propertyIsEnumerable(prop)) {
						this.player[prop] = res[prop];
					}
				}
				this.maxWorkTools = this.player.smithy;
			});

		this.socket
			.getMovement()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(res => {
				if (res.id === this.player.id) {
					this.isDisabled[res.resource] = false;
				}
			});

		this.socket
			.phase()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: string) => {
				this.currentPhase = res;
				if (res === "movement") {
					this.mockSmithy = this.player.smithy;
				}
			});
	}

	rollTheDice(amount: number) {
		const min = 1;
		const max = 6;
		let random = 0;
		for (let i = 1; i <= amount; i++) {
			random += Math.round(Math.random() * (max - min) + min);
		}
		this.resultOfDiceRoll = random;
		this.mockResult = random;
		return random;
	}

	countResource(
		name: string,
		addition: HTMLInputElement,
		counter: HTMLElement
	) {
		if (name === "agronomy" || name === "smithy") {
			this.countAgronomyOrSmithy(name);
		} else if (name === "population") {
			this.countPopulation(name);
		} else {
			this.countNatureResources(name, addition, counter);
		}
		this.isDisabled[name] = true;
	}

	sendChanges() {
		if (this.isEnd()) {
			this.socket.feed();
		}
	}

	countAgronomyOrSmithy(name: string) {
		this.isDisabled[name] = true;
		const data = {
			people: 1,
			resourceName: name,
			resourceAmount: 1,
			id: this.storage.playerStatistics.id
		};
		this.socket.returnPeople(data);
	}

	countPopulation(name: string) {
		this.isDisabled[name] = true;
		const data = {
			people: 2,
			resourceName: name,
			resourceAmount: 1
		};
		this.socket.returnPeople(data);
	}

	countNatureResources(
		name: string,
		addition: HTMLInputElement,
		elem: HTMLElement
	) {
		this.isDisabled[name] = true;
		const data = {
			people: this.storage[name],
			resourceName: name,
			resourceAmount: this.receivedResources,
			id: this.storage.playerStatistics.id
		};
		elem.classList.add("counter--hidden");
		addition.value = "";
		this.currentAddition = 0;
		this.socket.returnPeople(data);
		this.storage[name] = 0;
	}

	preliminaryResourceCounting(
		name: string,
		divider: number,
		elem: HTMLDivElement
	) {
		elem.classList.toggle("counter--hidden");
		const dice = this.rollTheDice(this.storage[name]);
		const result = Math.floor(dice / divider);
		this.receivedResources = result;
	}

	recountResource(divider: number, addition: number) {
		if (this.currentAddition < addition) {
			this.currentAddition = addition;
			this.mockSmithy--;
			this.maxWorkTools--;
		} else if (this.currentAddition > addition) {
			this.currentAddition = addition;
			this.mockSmithy++;
			this.maxWorkTools++;
		}
		const dice = this.resultOfDiceRoll + Number(addition);
		const result = Math.floor(dice / divider);
		this.mockResult = dice;
		this.receivedResources = result;
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
