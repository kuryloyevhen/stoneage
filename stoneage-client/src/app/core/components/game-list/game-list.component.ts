import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { StorageService } from "src/app/shared/services/storage.service";
import { GameCreatorService } from "src/app/shared/services/game-creator.service";
import { SocketService } from "src/app/shared/services/socket.service";
import { GameRoom } from "src/app/shared/interfaces/gameRoom";
import { PlayerStatistic } from "src/app/shared/interfaces/playerStatistic";
import { PlayerIdentification } from "src/app/shared/interfaces/playerIdentification";
import { PlayersList } from "src/app/shared/interfaces/playersList";
import { Dwelling } from "src/app/shared/interfaces/dwelling";
import { Card } from "src/app/shared/interfaces/card";
import * as Rx from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-game-list",
	templateUrl: "./game-list.component.html",
	styleUrls: ["./game-list.component.css"]
})
export class GameListComponent implements OnInit, OnDestroy {
	constructor(
		public dialog: MatDialog,
		private fb: FormBuilder,
		private service: GameCreatorService,
		private socket: SocketService,
		private storage: StorageService,
		private router: Router
	) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public readonly displayedColumns: Array<string> = ["name", "join"];
	public rooms: Array<GameRoom> = [];
	public roomForm = this.fb.group({
		name: [""]
	});

	ngOnInit() {
		this.socket
			.getPlayersList()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: PlayersList) => {
				this.storage.playersList = Object.entries(res) as Array<
					PlayerIdentification
				>;
			});

		this.service
			.getRooms()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: Array<GameRoom>) => {
				this.rooms = res;
			});

		this.socket
			.getMessages()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: Array<string>) => {
				this.storage.messages = res;
			});

		this.socket
			.changes()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: PlayerStatistic) => {
				for (const prop in res) {
					if (res.hasOwnProperty(prop) && res.propertyIsEnumerable(prop)) {
						this.storage.playerStatistics[prop] = res[prop];
					}
				}
			});

		this.socket
			.changePlayer()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: string) => {
				this.storage.currentPlayerId = res;
			});

		this.socket
			.phase()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: string) => {
				this.socket.currentPhase = res;
			});

		this.socket
			.getCards()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: Array<Card>) => {
				this.storage.cardsArr = res;
			});

		this.socket
			.getDwellings()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: Array<Dwelling>) => {
				this.storage.dwellingsArr = res;
			});
	}

	createGame() {
		this.service
			.createRoom(this.roomForm.value)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: GameRoom) => {
				this.socket.room = res.name;
				this.socket.connectToRoom(this.roomForm.value.name);
				this.dialog.closeAll();
				this.router.navigate(["stoneage"]);
			});
	}

	joinToGame(name: string) {
		this.socket.connectToRoom(name);
		this.service.isPlaying = true;
		this.router.navigate(["stoneage"]);
		this.dialog.closeAll();
		this.socket.room = name;
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
