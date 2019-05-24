import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";
import { StorageService } from "src/app/shared/services/storage.service";
import { ReturningPeople } from "src/app/shared/interfaces/returningPeople";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-reproduction",
	templateUrl: "./reproduction.component.html",
	styleUrls: ["./reproduction.component.css"]
})
export class ReproductionComponent implements OnInit, OnDestroy {
	constructor(
		private socket: SocketService,
		private storage: StorageService,
		private elemRef: ElementRef
	) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public rootElem: HTMLElement = this.elemRef.nativeElement;
	public resource: string = "population";
	public humanPlaces: Array<HTMLElement>;

	ngOnInit() {
		this.humanPlaces = Array.from(
			this.rootElem.getElementsByClassName("human-place")
		) as Array<HTMLElement>;
		this.socket
			.getMovement()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: PlayerStatistic) => {
				if (this.resource in res && res[this.resource] !== 0) {
					this.getCheckedStuff(this.resource, res);
				}
			});
		this.socket
			.getReturn()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: ReturningPeople) => {
				if (res.resourceName === "population") {
					this.returnStuff();
				}
			});
	}

	getCheckedStuff(resource: string, data: PlayerStatistic) {
		this.storage[resource] = data[resource];
		for (const place of this.humanPlaces) {
			place.classList.add("checked");
		}
	}

	returnStuff() {
		for (const place of this.humanPlaces) {
			place.classList.remove("checked");
		}
	}

	takePopulation() {
		const data = {
			staff: "population",
			amount: 2
		};
		this.socket.move(data);
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
