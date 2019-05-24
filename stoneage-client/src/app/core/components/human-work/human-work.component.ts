import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "src/app/shared/services/socket.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { takeUntil } from "rxjs/operators";
import * as RX from "rxjs";

@Component({
	selector: "app-human-work",
	templateUrl: "./human-work.component.html",
	styleUrls: ["./human-work.component.css"]
})
export class HumanWorkComponent implements OnInit, OnDestroy {
	constructor(private socket: SocketService, private storage: StorageService) {}

	private unsubscribe: RX.Subject<any> = new RX.Subject();
	public currentPhase: string;

	ngOnInit() {
		this.currentPhase = this.socket.currentPhase;
		this.socket
			.phase()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: string) => (this.currentPhase = res));
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
