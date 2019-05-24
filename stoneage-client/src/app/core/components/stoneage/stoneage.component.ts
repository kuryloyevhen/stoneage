import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "../../../shared/services/socket.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { PlayerIdentification } from "src/app/shared/interfaces/playerIdentification";
import { PlayersList } from "src/app/shared/interfaces/playersList";
import { takeUntil } from "rxjs/operators";
import * as RX from "rxjs";

@Component({
	selector: "app-stoneage",
	templateUrl: "./stoneage.component.html",
	styleUrls: ["./stoneage.component.css"]
})
export class StoneageComponent implements OnInit, OnDestroy {
	constructor(private socket: SocketService, private storage: StorageService) {}

	private unsubscribe: RX.Subject<any> = new RX.Subject();
	public players: Array<PlayerIdentification>;
	public currentPlayerId: string;

	ngOnInit() {
		this.players = this.storage.playersList;
		this.currentPlayerId = this.storage.currentPlayerId;
		this.socket
			.getPlayersList()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: PlayersList) => {
				this.players = Object.entries(res);
			});

		this.socket
			.movementError()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((error: string) => window.alert(error));

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
