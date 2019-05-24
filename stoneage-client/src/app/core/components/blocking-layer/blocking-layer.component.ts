import { Component, OnInit, OnDestroy } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import { SocketService } from "src/app/shared/services/socket.service";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-blocking-layer",
	templateUrl: "./blocking-layer.component.html",
	styleUrls: ["./blocking-layer.component.css"]
})
export class BlockingLayerComponent implements OnInit, OnDestroy {
	constructor(private storage: StorageService, private socket: SocketService) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();

	public currentPlayerId: string;
	public playerId: string;

	ngOnInit() {
		this.currentPlayerId = this.storage.currentPlayerId as string;
		this.playerId = this.storage.playerStatistics.id as string;
		this.socket
			.changePlayer()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((playerId: string) => (this.currentPlayerId = playerId));
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
