import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { StorageService } from "./storage.service";

@Injectable({
	providedIn: "root"
})
export class SocketService {
	constructor(private storage: StorageService) {}

	private url = "http://127.0.0.1:3000";
	stoneage;
	room = "";
	currentPhase;

	connectToSocket() {
		this.stoneage = io.connect(`${this.url}/stoneage`);
	}

	sendMessage(message) {
		const body = {
			room: this.room,
			message
		};
		this.stoneage.emit("message", body);
	}

	getMessages() {
		return Observable.create(observer =>
			this.stoneage.on("message", message => observer.next(message))
		);
	}

	connectToRoom(name) {
		this.stoneage.emit("join", { room: name, player: this.storage.playerName });
	}

	getRoomList() {
		return Observable.create(observer =>
			this.stoneage.on("join", message => {
				observer.next(message);
				console.log(`getRoom: ${message}`);
			})
		);
	}

	getPlayersList() {
		return Observable.create(observer =>
			this.stoneage.on("join", data => {
				observer.next(data);
				console.log(`getPlayers: ${data}`);
			})
		);
	}

	changes() {
		return Observable.create(observer => {
			this.stoneage.on("changes", data => {
				observer.next(data);
			});
		});
	}

	move(data) {
		data.room = this.room;
		this.stoneage.emit("movement", data);
	}

	getMovement() {
		return Observable.create(observer => {
			this.stoneage.on("movement", data => observer.next(data));
		});
	}

	movementError() {
		return Observable.create(observer => {
			this.stoneage.on("movementError", error => observer.next(error));
		});
	}

	returnPeople(data) {
		this.stoneage.emit("return", data);
	}

	getReturn() {
		return Observable.create(observer => {
			this.stoneage.on("return", data => {
				observer.next(data);
			});
		});
	}

	feed() {
		this.stoneage.emit("feed", this.room);
	}

	phase() {
		return Observable.create(observer => {
			this.stoneage.on("changePhase", data => {
				observer.next(data);
			});
		});
	}

	changePhase(data) {
		this.stoneage.emit("changePhase", data);
	}

	changePlayer() {
		return Observable.create(observer => {
			this.stoneage.on("changePlayer", id => {
				observer.next(id);
			});
		});
	}

	nextPlayer() {
		this.stoneage.emit("changePlayer", this.room);
	}

	getCards() {
		return Observable.create(observer => {
			this.stoneage.on("cards", cards => {
				observer.next(cards);
			});
		});
	}

	getDwellings() {
		return Observable.create(observer => {
			this.stoneage.on("dwellings", dwellings => {
				observer.next(dwellings);
			});
		});
	}
}
