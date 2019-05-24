import { Component, OnDestroy } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { StorageService } from "src/app/shared/services/storage.service";
import { LoginData } from "src/app/shared/interfaces/loginData";
import { takeUntil } from "rxjs/operators";
import * as Rx from "rxjs";

@Component({
	selector: "app-register-form",
	templateUrl: "./register-form.component.html",
	styleUrls: ["./register-form.component.css"]
})
export class RegisterFormComponent implements OnDestroy {
	constructor(
		private service: AuthService,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private storage: StorageService
	) {}

	private unsubscribe: Rx.Subject<any> = new Rx.Subject();
	public registerForm = this.fb.group({
		name: [""],
		password: [""],
		email: [""]
	});

	register() {
		this.service
			.register(this.registerForm.value)
			.pipe(takeUntil(this.unsubscribe))
			.subscribe((res: LoginData) => {
				this.setLogData(res);
				this.dialog.closeAll();
				this.registerForm.reset();
			});
	}

	setLogData(res: LoginData) {
		this.service.isAuthorized = true;
		this.service.user = res;
		this.storage.playerName = res.name;
	}

	ngOnDestroy() {
		this.unsubscribe.next();
		this.unsubscribe.complete();
	}
}
