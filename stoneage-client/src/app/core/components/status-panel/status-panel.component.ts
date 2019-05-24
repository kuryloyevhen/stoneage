import { Component, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { LoginDialogComponent } from "../login-dialog/login-dialog.component";
import { GameListComponent } from "../game-list/game-list.component";
import { AuthService } from "../../../shared/services/auth.service";
import { RegisterFormComponent } from "../register-form/register-form.component";
import { SocketService } from "src/app/shared/services/socket.service";
import { Router } from "@angular/router";
import { GameCreatorService } from "src/app/shared/services/game-creator.service";
import * as Rx from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "app-status-panel",
	templateUrl: "./status-panel.component.html",
	styleUrls: ["./status-panel.component.css"]
})
export class StatusPanelComponent implements OnDestroy {
	constructor(
		public dialog: MatDialog,
		public service: AuthService,
		private gameCreator: GameCreatorService,
		private socket: SocketService,
		private router: Router
	) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public user: object;
	public isAuthorized: boolean = false;
	public isPlaying: boolean = false;

	openLoginDialog() {
		let dialogConfig = new MatDialogConfig();
		dialogConfig = {
			disableClose: true,
			autoFocus: true,
			width: "250px",
			height: "210px"
		};
		const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
		dialogRef
			.afterClosed()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.setLogData());
	}

	openGameList() {
		let dialogConfig = new MatDialogConfig();
		dialogConfig = {
			disableClose: true,
			autoFocus: true,
			width: "400px",
			height: "400px"
		};
		const dialogRef = this.dialog.open(GameListComponent, dialogConfig);
		dialogRef
			.afterClosed()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => {
				this.isPlaying = this.gameCreator.isPlaying;
			});
	}

	openRegisterForm() {
		let dialogConfig = new MatDialogConfig();
		dialogConfig = {
			disableClose: true,
			autoFocus: true,
			width: "300px",
			height: "270px"
		};
		const dialogRef = this.dialog.open(RegisterFormComponent, dialogConfig);
		dialogRef
			.afterClosed()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.setLogData());
	}

	logout() {
		this.service
			.logout()
			.pipe(takeUntil(this.unsubscribe))
			.subscribe(() => this.resetLogData());
		this.socket.stoneage.disconnect();
		this.router.navigate(["home"]);
	}

	resetLogData() {
		this.isAuthorized = false;
		this.service.isAuthorized = false;
		this.isPlaying = false;
		this.service.isPlaying = false;
		this.user = {};
	}

	setLogData() {
		this.isAuthorized = this.service.isAuthorized;
		this.user = this.service.user;
		this.socket.connectToSocket();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
