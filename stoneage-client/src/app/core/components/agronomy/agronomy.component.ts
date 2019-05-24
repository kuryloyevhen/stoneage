import { Component,
         OnInit,
         OnDestroy,
         ElementRef,
         ViewChild,
         AfterViewInit } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";
import { StorageService } from "src/app/shared/services/storage.service";
import { ReturningPeople } from "src/app/shared/interfaces/returningPeople";
import * as Rx from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-agronomy",
	templateUrl: "./agronomy.component.html",
	styleUrls: ["./agronomy.component.css"]
})
export class AgronomyComponent implements OnInit, OnDestroy, AfterViewInit {
	constructor(
		private socket: SocketService,
		private storage: StorageService,
		private elemRef: ElementRef
   ) {}

   private unsubscribe: Rx.Subject<any> = new Rx.Subject();

   @ViewChild('span') span;
	public rootElem: HTMLElement = this.elemRef.nativeElement;
	public resource: string = "agronomy";
	public humanPlaces: Array<HTMLElement>;

	ngOnInit() {
		this.humanPlaces = Array.from(
			this.rootElem.getElementsByClassName("human-place")) as Array<HTMLElement>;
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
				if (res.resourceName === "agronomy") {
					this.returnStuff(res);
				}
			});
   }

   ngAfterViewInit() {
      console.log(this.span);
   }

	getCheckedStuff(resource: string, data: PlayerStatistic) {
		this.storage[resource] = data[resource];
		for (const place of this.humanPlaces) {
			place.classList.add("checked");
		}
	}

	returnStuff(data: ReturningPeople) {
		for (const place of this.humanPlaces) {
			place.classList.remove("checked");
		}
	}

	takeTheAgronomy() {
		const data = {
			staff: "agronomy",
			amount: 1
		};
		this.socket.move(data);
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
