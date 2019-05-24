import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-chat",
	templateUrl: "./chat.component.html",
	styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit, OnDestroy {
	constructor(private socket: SocketService, private storage: StorageService) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public message: string;
	public messages: string[] = [];

	sendMessage() {
		this.socket.sendMessage(`${this.storage.playerName}: ${this.message}`);
		this.message = "";
	}

	ngOnInit() {
		this.messages = this.storage.messages as string[];

		this.socket
			.getMessages()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((messages: string[]) => {
				this.messages = messages;
			});
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
