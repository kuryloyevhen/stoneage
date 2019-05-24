import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { SocketService } from "src/app/shared/services/socket.service";
import { StorageService } from "src/app/shared/services/storage.service";
import { LoginData } from "src/app/shared/interfaces/loginData";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-login-dialog",
	templateUrl: "./login-dialog.component.html",
	styleUrls: ["./login-dialog.component.css"]
})
export class LoginDialogComponent implements OnDestroy {
	constructor(
		private service: AuthService,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private socket: SocketService,
		private storage: StorageService
	) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public loginForm = this.fb.group({
		name: [""],
		password: [""]
	});

	login() {
		this.service
			.login(this.loginForm.value)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: LoginData) => {
				this.setLogData(res);
				this.loginForm.reset();
			});
	}

	setLogData(res: LoginData) {
		this.service.isAuthorized = true;
		this.service.user = res;
		this.storage.playerName = res.name;
		this.socket.connectToSocket();
		this.dialog.closeAll();
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
