import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import * as Rx from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-cards",
	templateUrl: "./cards.component.html",
	styleUrls: ["./cards.component.css"]
})
export class CardsComponent implements OnInit, OnDestroy {
	constructor(private socket: SocketService) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public currentPhase: string;

	ngOnInit() {
		this.currentPhase = this.socket.currentPhase as string;
		this.socket
			.phase()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((phase: string) => (this.currentPhase = phase));
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
